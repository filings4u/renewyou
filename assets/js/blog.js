/**
 * ReNew You Health & Wellness - Public Blog Controller
 * Location: assets/js/blog.js
 *
 * Reads published blog posts from Supabase and renders:
 * - Blog listing
 * - Search
 * - Category filtering
 * - Individual article pages
 */

document.addEventListener('DOMContentLoaded', () => {
    initBlogPage();
});


/* =========================================================
   SUPABASE CONFIGURATION
========================================================= */

const BLOG_SUPABASE_PROJECT_URL =
    'https://lrbimrlbskjweynxlgas.supabase.co';

const BLOG_SUPABASE_ANON_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyYmltcmxic2tqd2V5bnhsZ2FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MjQ0NTYsImV4cCI6MjA5NDEwMDQ1Nn0.I8fQ6ZjA9oaTqJCF-7Z7vUboXC8zv2cogBv4PC_1ihU';


let blogSupabaseClient = null;

let blogPosts = [];

let blogSearchQuery = '';

let blogCategoryFilter = 'all';


/* =========================================================
   INITIALIZATION
========================================================= */

async function initBlogPage() {

    const target =
        document.getElementById(
            'blog-target'
        );

    if (!target) {
        return;
    }


    /*
     * The Supabase CDN is already loaded by blog.html.
     */
    if (
        !window.supabase ||
        typeof window.supabase.createClient !==
            'function'
    ) {

        renderBlogError(
            target,
            'The blog service could not be initialized.'
        );

        return;

    }


    blogSupabaseClient =
        window.supabase.createClient(
            BLOG_SUPABASE_PROJECT_URL,
            BLOG_SUPABASE_ANON_KEY
        );


    const slug =
        getBlogSlug();


    if (slug) {

        await loadBlogArticle(
            slug
        );

        return;

    }


    renderBlogShell(
        target
    );


    await loadPublishedBlogPosts();

}


/* =========================================================
   BLOG SHELL
========================================================= */

function renderBlogShell(
    target
) {

    target.innerHTML = `

        <main
            class="renew-you-blog"
            aria-label="ReNew You Health & Wellness Blog"
        >

            <section class="renew-you-blog-hero">

                <div class="renew-you-blog-container">

                    <span class="renew-you-blog-eyebrow">
                        ReNew You Health & Wellness
                    </span>

                    <h1>
                        The ReNew You Blog
                    </h1>

                    <p>
                        Wellness education, DOT testing
                        information, clinic updates,
                        and helpful resources for our community.
                    </p>

                </div>

            </section>


            <section class="renew-you-blog-content">

                <div class="renew-you-blog-container">

                    <div
                        class="renew-you-blog-toolbar"
                    >

                        <div class="renew-you-blog-search-wrap">

                            <span
                                aria-hidden="true"
                            >
                                🔎
                            </span>

                            <input
                                type="search"
                                id="renewYouBlogSearch"
                                placeholder="Search articles..."
                                aria-label="Search blog articles"
                                autocomplete="off"
                            >

                        </div>


                        <select
                            id="renewYouBlogCategory"
                            aria-label="Filter blog by category"
                        >

                            <option value="all">
                                All Categories
                            </option>

                        </select>

                    </div>


                    <div
                        id="renewYouBlogGrid"
                        class="renew-you-blog-grid"
                    >

                        <div
                            class="renew-you-blog-message"
                        >
                            Loading articles...
                        </div>

                    </div>

                </div>

            </section>

        </main>

    `;


    injectBlogStyles();


    bindBlogEvents();

}


/* =========================================================
   LOAD PUBLISHED POSTS
========================================================= */

async function loadPublishedBlogPosts() {

    const grid =
        document.getElementById(
            'renewYouBlogGrid'
        );


    if (!grid) {
        return;
    }


    grid.innerHTML = `
        <div class="renew-you-blog-message">
            Loading articles...
        </div>
    `;


    try {

        const {
            data,
            error
        } =
            await blogSupabaseClient

                .from(
                    'blog_posts'
                )

                .select(`
                    id,
                    title,
                    slug,
                    excerpt,
                    content,
                    featured_image_url,
                    category,
                    author,
                    status,
                    published_at,
                    created_at,
                    likes_count
                `)

                .eq(
                    'status',
                    'published'
                )

                .not(
                    'published_at',
                    'is',
                    null
                )

                .lte(
                    'published_at',
                    new Date().toISOString()
                )

                .order(
                    'published_at',
                    {
                        ascending:false
                    }
                );


        if (error) {
            throw error;
        }


        blogPosts =
            Array.isArray(data)
                ? data
                : [];


        populateBlogCategories();

        populateBlogPosts();


    } catch (error) {

        console.error(
            'Blog post loading error:',
            error
        );


        renderBlogError(
            grid,
            error?.message ||
            'Unable to load blog articles.'
        );

    }

}


/* =========================================================
   CATEGORIES
========================================================= */

function populateBlogCategories() {

    const select =
        document.getElementById(
            'renewYouBlogCategory'
        );


    if (!select) {
        return;
    }


    const categories =
        [
            ...new Set(
                blogPosts
                    .map(
                        post =>
                            String(
                                post?.category ||
                                ''
                            ).trim()
                    )
                    .filter(Boolean)
            )
        ]
            .sort(
                (a, b) =>
                    a.localeCompare(b)
            );


    select.innerHTML = `
        <option value="all">
            All Categories
        </option>
    `;


    categories.forEach(
        category => {

            const option =
                document.createElement(
                    'option'
                );

            option.value =
                category;

            option.textContent =
                category;

            select.appendChild(
                option
            );

        }
    );

}


/* =========================================================
   RENDER POST CARDS
========================================================= */

function populateBlogPosts() {

    const grid =
        document.getElementById(
            'renewYouBlogGrid'
        );


    if (!grid) {
        return;
    }


    const filteredPosts =
        blogPosts.filter(
            post => {

                const searchableText =
                    [
                        post?.title,
                        post?.excerpt,
                        post?.content,
                        post?.category,
                        post?.author
                    ]
                        .map(
                            value =>
                                String(
                                    value ||
                                    ''
                                )
                                    .toLowerCase()
                        )
                        .join(' ');


                const matchesSearch =
                    !blogSearchQuery ||
                    searchableText.includes(
                        blogSearchQuery
                    );


                const matchesCategory =
                    blogCategoryFilter ===
                        'all' ||
                    String(
                        post?.category ||
                        ''
                    ) ===
                        blogCategoryFilter;


                return (
                    matchesSearch &&
                    matchesCategory
                );

            }
        );


    if (
        filteredPosts.length === 0
    ) {

        grid.innerHTML = `
            <div class="renew-you-blog-message">

                <div style="
                    font-size:2rem;
                    margin-bottom:10px;
                ">
                    📝
                </div>

                <strong>
                    No articles found.
                </strong>

                <p style="
                    margin:8px 0 0;
                    color:#777;
                ">
                    Try another search or category.
                </p>

            </div>
        `;

        return;

    }


    grid.innerHTML =
        filteredPosts
            .map(
                post =>
                    renderBlogCard(
                        post
                    )
            )
            .join('');

}


/* =========================================================
   BLOG CARD
========================================================= */

function renderBlogCard(
    post
) {

    const title =
        String(
            post?.title ||
            'Untitled Article'
        );


    const slug =
        String(
            post?.slug ||
            ''
        );


    const category =
        String(
            post?.category ||
            'ReNew You'
        );


    const excerpt =
        String(
            post?.excerpt ||
            createExcerpt(
                post?.content
            )
        );


    const image =
        String(
            post?.featured_image_url ||
            ''
        ).trim();


    const author =
        String(
            post?.author ||
            'ReNew You Health & Wellness'
        );


    const date =
        formatBlogDate(
            post?.published_at
        );


    return `

        <article
            class="renew-you-blog-card"
        >

            ${
                image
                    ? `
                        <a
                            href="blog.html?slug=${encodeURIComponent(slug)}"
                            class="renew-you-blog-image-link"
                            aria-label="Read ${escapeHtml(title)}"
                        >

                            <img
                                class="renew-you-blog-card-image"
                                src="${escapeHtml(image)}"
                                alt="${escapeHtml(title)}"
                                loading="lazy"
                                onerror="this.parentElement.style.display='none';"
                            >

                        </a>
                    `
                    : `
                        <a
                            href="blog.html?slug=${encodeURIComponent(slug)}"
                            class="renew-you-blog-card-image-placeholder"
                            aria-label="Read ${escapeHtml(title)}"
                        >
                            <span>
                                ReNew You
                            </span>
                        </a>
                    `
            }


            <div class="renew-you-blog-card-body">

                <span class="renew-you-blog-card-category">
                    ${escapeHtml(category)}
                </span>


                <h2>
                    ${escapeHtml(title)}
                </h2>


                <p>
                    ${escapeHtml(excerpt)}
                </p>


                <div
                    class="renew-you-blog-card-meta"
                >

                    <span>
                        ${escapeHtml(author)}
                    </span>

                    <span>
                        ${escapeHtml(date)}
                    </span>

                </div>


                <a
                    class="renew-you-blog-read-more"
                    href="blog.html?slug=${encodeURIComponent(slug)}"
                >
                    Read Article
                    <span aria-hidden="true">
                        →
                    </span>
                </a>

            </div>

        </article>

    `;

}


/* =========================================================
   LOAD INDIVIDUAL ARTICLE
========================================================= */

async function loadBlogArticle(
    slug
) {

    const target =
        document.getElementById(
            'blog-target'
        );


    if (!target) {
        return;
    }


    target.innerHTML = `
        <main class="renew-you-blog">
            <section class="renew-you-blog-content">
                <div class="renew-you-blog-container">
                    <div class="renew-you-blog-message">
                        Loading article...
                    </div>
                </div>
            </section>
        </main>
    `;


    injectBlogStyles();


    try {

        const {
            data,
            error
        } =
            await blogSupabaseClient

                .from(
                    'blog_posts'
                )

                .select(`
                    id,
                    title,
                    slug,
                    excerpt,
                    content,
                    featured_image_url,
                    category,
                    author,
                    status,
                    published_at,
                    created_at,
                    likes_count
                `)

                .eq(
                    'slug',
                    slug
                )

                .eq(
                    'status',
                    'published'
                )

                .not(
                    'published_at',
                    'is',
                    null
                )

                .lte(
                    'published_at',
                    new Date().toISOString()
                )

                .maybeSingle();


        if (error) {
            throw error;
        }


        if (!data) {

            renderBlogArticleNotFound(
                target
            );

            return;

        }


        renderBlogArticle(
            target,
            data
        );


    } catch (error) {

        console.error(
            'Blog article loading error:',
            error
        );


        renderBlogError(
            target,
            error?.message ||
            'Unable to load this article.'
        );

    }

}


/* =========================================================
   ARTICLE
========================================================= */

function renderBlogArticle(
    target,
    post
) {

    const title =
        String(
            post?.title ||
            'Untitled Article'
        );


    const category =
        String(
            post?.category ||
            'ReNew You Health & Wellness'
        );


    const author =
        String(
            post?.author ||
            'ReNew You Health & Wellness'
        );


    const date =
        formatBlogDate(
            post?.published_at
        );


    const image =
        String(
            post?.featured_image_url ||
            ''
        ).trim();


    const content =
        formatBlogContent(
            post?.content
        );


    updateBlogPageMetadata(
        title,
        post?.excerpt ||
        createExcerpt(
            post?.content
        )
    );


    target.innerHTML = `

        <main
            class="renew-you-blog"
            aria-label="${escapeHtml(title)}"
        >

            <section
                class="renew-you-blog-article-section"
            >

                <div
                    class="renew-you-blog-container"
                >

                    <a
                        href="blog.html"
                        class="renew-you-blog-back"
                    >
                        ← Back to Blog
                    </a>


                    <article
                        class="renew-you-blog-article"
                    >

                        ${
                            image
                                ? `
                                    <img
                                        class="renew-you-blog-article-image"
                                        src="${escapeHtml(image)}"
                                        alt="${escapeHtml(title)}"
                                    >
                                  `
                                : ''
                        }


                        <div
                            class="renew-you-blog-article-body"
                        >

                            <span
                                class="renew-you-blog-card-category"
                            >
                                ${escapeHtml(category)}
                            </span>


                            <h1>
                                ${escapeHtml(title)}
                            </h1>


                            <div
                                class="renew-you-blog-article-meta"
                            >
                                By
                                ${escapeHtml(author)}
                                ·
                                ${escapeHtml(date)}
                            </div>


                            <div
                                class="renew-you-blog-engagement"
                                data-blog-post-id="${escapeHtml(post?.id || '')}"
                            >

                                <button
                                    type="button"
                                    class="renew-you-blog-like-btn"
                                    id="renewYouBlogLikeBtn"
                                    aria-pressed="false"
                                    aria-label="Like this article"
                                >
                                    <span
                                        class="renew-you-blog-like-icon"
                                        aria-hidden="true"
                                    >
                                        ♡
                                    </span>

                                    <span
                                        class="renew-you-blog-like-label"
                                    >
                                        Like
                                    </span>

                                    <span
                                        class="renew-you-blog-like-count"
                                        id="renewYouBlogLikeCount"
                                    >
                                        ${formatLikeCount(post?.likes_count)}
                                    </span>
                                </button>


                                <div
                                    class="renew-you-blog-share-group"
                                    aria-label="Share this article"
                                >

                                    <span class="renew-you-blog-share-label">
                                        Share:
                                    </span>

                                    <a
                                        href="#"
                                        class="renew-you-blog-share-btn renew-you-blog-share-facebook"
                                        data-share-network="facebook"
                                        aria-label="Share on Facebook"
                                        title="Share on Facebook"
                                    >
                                        f
                                    </a>

                                    <a
                                        href="#"
                                        class="renew-you-blog-share-btn renew-you-blog-share-x"
                                        data-share-network="x"
                                        aria-label="Share on X"
                                        title="Share on X"
                                    >
                                        𝕏
                                    </a>

                                    <a
                                        href="#"
                                        class="renew-you-blog-share-btn renew-you-blog-share-linkedin"
                                        data-share-network="linkedin"
                                        aria-label="Share on LinkedIn"
                                        title="Share on LinkedIn"
                                    >
                                        in
                                    </a>

                                    <a
                                        href="#"
                                        class="renew-you-blog-share-btn renew-you-blog-share-whatsapp"
                                        data-share-network="whatsapp"
                                        aria-label="Share on WhatsApp"
                                        title="Share on WhatsApp"
                                    >
                                        WA
                                    </a>


                                    <button
                                        type="button"
                                        class="renew-you-blog-share-btn renew-you-blog-share-native"
                                        data-share-network="native"
                                        aria-label="Share this article"
                                        title="Share this article"
                                    >
                                        ↗
                                    </button>

                                    <button
                                        type="button"
                                        class="renew-you-blog-share-btn renew-you-blog-share-copy"
                                        data-share-network="copy"
                                        aria-label="Copy article link"
                                        title="Copy article link"
                                    >
                                        🔗
                                    </button>

                                </div>


                                <div
                                    class="renew-you-blog-engagement-status"
                                    id="renewYouBlogEngagementStatus"
                                    aria-live="polite"
                                ></div>

                            </div>


                            ${
                                post?.excerpt
                                    ? `
                                        <p
                                            class="renew-you-blog-article-excerpt"
                                        >
                                            ${escapeHtml(
                                                post.excerpt
                                            )}
                                        </p>
                                      `
                                    : ''
                            }


                            <div
                                class="renew-you-blog-article-content"
                            >
                                ${content}
                            </div>

                        </div>

                    </article>

                </div>

            </section>

        </main>

    `;


    bindBlogArticleEngagementEvents(
        post
    );

}


/* =========================================================
   ARTICLE ENGAGEMENT
========================================================= */

function formatLikeCount(
    value
) {

    const count =
        Number.isFinite(
            Number(value)
        )
            ? Math.max(
                0,
                Number(value)
            )
            : 0;

    return count.toLocaleString(
        'en-US'
    );

}


function getBlogLikeStorageKey(
    postId
) {

    return (
        'renewYouBlogLiked:' +
        String(postId || '').trim()
    );

}


function hasLikedBlogPost(
    postId
) {

    if (!postId) {
        return false;
    }

    try {

        return (
            localStorage.getItem(
                getBlogLikeStorageKey(postId)
            ) === 'true'
        );

    } catch (error) {

        console.warn(
            'Unable to read blog like state:',
            error
        );

        return false;

    }

}


function saveBlogLikeState(
    postId
) {

    if (!postId) {
        return;
    }

    try {

        localStorage.setItem(
            getBlogLikeStorageKey(postId),
            'true'
        );

    } catch (error) {

        console.warn(
            'Unable to save blog like state:',
            error
        );

    }

}


function setBlogLikeButtonState(
    button,
    liked,
    count
) {

    if (!button) {
        return;
    }

    button.classList.toggle(
        'is-liked',
        Boolean(liked)
    );

    button.setAttribute(
        'aria-pressed',
        liked ? 'true' : 'false'
    );

    button.setAttribute(
        'aria-label',
        liked
            ? 'Unlike this article'
            : 'Like this article'
    );

    const icon =
        button.querySelector(
            '.renew-you-blog-like-icon'
        );

    if (icon) {

        icon.textContent =
            liked
                ? '♥'
                : '♡';

    }

    const label =
        button.querySelector(
            '.renew-you-blog-like-label'
        );

    if (label) {

        label.textContent =
            liked
                ? 'Liked'
                : 'Like';

    }

    const countElement =
        button.querySelector(
            '.renew-you-blog-like-count'
        );

    if (countElement) {

        countElement.textContent =
            formatLikeCount(count);

    }

}


function setBlogEngagementStatus(
    message,
    type = 'info'
) {

    const status =
        document.getElementById(
            'renewYouBlogEngagementStatus'
        );

    if (!status) {
        return;
    }

    status.textContent =
        message || '';

    status.className =
        'renew-you-blog-engagement-status ' +
        (
            type === 'error'
                ? 'is-error'
                : type === 'success'
                    ? 'is-success'
                    : ''
        );

}


async function handleBlogLike(
    post
) {

    const button =
        document.getElementById(
            'renewYouBlogLikeBtn'
        );

    if (
        !button ||
        !post?.id
    ) {
        return;
    }

    if (
        hasLikedBlogPost(
            post.id
        )
    ) {

        setBlogEngagementStatus(
            'You already liked this article.',
            'info'
        );

        return;

    }

    const currentCount =
        Number.isFinite(
            Number(post.likes_count)
        )
            ? Math.max(
                0,
                Number(post.likes_count)
            )
            : 0;


    button.disabled = true;

    setBlogEngagementStatus(
        'Saving your like...'
    );


    try {

        const {
            data,
            error
        } =
            await blogSupabaseClient.rpc(
                'increment_blog_post_like',
                {
                    p_post_id: post.id
                }
            );


        if (error) {
            throw error;
        }


        const returnedCount =
            Array.isArray(data)
                ? data[0]
                : data;


        const newCount =
            Number.isFinite(
                Number(returnedCount)
            )
                ? Number(returnedCount)
                : currentCount + 1;


        post.likes_count =
            Math.max(
                currentCount + 1,
                newCount
            );


        saveBlogLikeState(
            post.id
        );


        setBlogLikeButtonState(
            button,
            true,
            post.likes_count
        );


        setBlogEngagementStatus(
            'Thanks for liking this article!',
            'success'
        );


    } catch (error) {

        console.error(
            'Blog like error:',
            error
        );


        button.disabled = false;


        setBlogEngagementStatus(
            'We could not save your like right now. Please try again.',
            'error'
        );

    }

}


function openBlogShareWindow(
    url
) {

    window.open(
        url,
        '_blank',
        'noopener,noreferrer,width=680,height=620'
    );

}


async function copyBlogArticleLink(
    url
) {

    try {

        if (
            navigator.clipboard &&
            typeof navigator.clipboard.writeText ===
                'function'
        ) {

            await navigator.clipboard.writeText(
                url
            );

        } else {

            const textarea =
                document.createElement(
                    'textarea'
                );

            textarea.value = url;

            textarea.setAttribute(
                'readonly',
                ''
            );

            textarea.style.position =
                'fixed';

            textarea.style.opacity =
                '0';

            document.body.appendChild(
                textarea
            );

            textarea.select();

            document.execCommand(
                'copy'
            );

            textarea.remove();

        }


        setBlogEngagementStatus(
            'Article link copied to your clipboard.',
            'success'
        );


    } catch (error) {

        console.error(
            'Blog link copy error:',
            error
        );


        setBlogEngagementStatus(
            'Unable to copy the article link.',
            'error'
        );

    }

}


async function handleBlogShare(
    network,
    post
) {

    const url =
        window.location.href;

    const title =
        String(
            post?.title ||
            'ReNew You Health & Wellness'
        );

    const encodedUrl =
        encodeURIComponent(
            url
        );

    const encodedTitle =
        encodeURIComponent(
            title
        );


    if (
        network === 'native'
    ) {

        if (
            navigator.share &&
            typeof navigator.share ===
                'function'
        ) {

            try {

                await navigator.share({
                    title:title,
                    text:
                        String(
                            post?.excerpt ||
                            'Read this article from ReNew You Health & Wellness.'
                        ),
                    url:url
                });

            } catch (error) {

                if (
                    error?.name !==
                    'AbortError'
                ) {

                    console.error(
                        'Native share error:',
                        error
                    );

                }

            }

        } else {

            await copyBlogArticleLink(
                url
            );

        }

        return;

    }


    if (
        network === 'copy'
    ) {

        await copyBlogArticleLink(
            url
        );

        return;

    }


    let shareUrl = '';


    if (
        network === 'facebook'
    ) {

        shareUrl =
            'https://www.facebook.com/sharer/sharer.php?u=' +
            encodedUrl;

    }


    if (
        network === 'x'
    ) {

        shareUrl =
            'https://twitter.com/intent/tweet?url=' +
            encodedUrl +
            '&text=' +
            encodedTitle;

    }


    if (
        network === 'linkedin'
    ) {

        shareUrl =
            'https://www.linkedin.com/sharing/share-offsite/?url=' +
            encodedUrl;

    }


    if (
        network === 'whatsapp'
    ) {

        shareUrl =
            'https://wa.me/?text=' +
            encodeURIComponent(
                title +
                ' ' +
                url
            );

    }


    if (shareUrl) {

        openBlogShareWindow(
            shareUrl
        );

    }

}


function bindBlogArticleEngagementEvents(
    post
) {

    const likeButton =
        document.getElementById(
            'renewYouBlogLikeBtn'
        );


    if (likeButton) {

        const liked =
            hasLikedBlogPost(
                post?.id
            );


        setBlogLikeButtonState(
            likeButton,
            liked,
            post?.likes_count
        );


        likeButton.addEventListener(
            'click',
            () => {

                if (!liked) {

                    handleBlogLike(
                        post
                    );

                }

            }
        );

    }


    const shareButtons =
        document.querySelectorAll(
            '[data-share-network]'
        );


    shareButtons.forEach(
        button => {

            button.addEventListener(
                'click',
                event => {

                    const network =
                        button.getAttribute(
                            'data-share-network'
                        );


                    if (
                        network === 'facebook' ||
                        network === 'x' ||
                        network === 'linkedin' ||
                        network === 'whatsapp'
                    ) {

                        event.preventDefault();

                    }


                    handleBlogShare(
                        network,
                        post
                    );

                }
            );

        }
    );

}


/* =========================================================
   ARTICLE NOT FOUND
========================================================= */

function renderBlogArticleNotFound(
    target
) {

    target.innerHTML = `

        <main class="renew-you-blog">

            <section
                class="renew-you-blog-article-section"
            >

                <div
                    class="renew-you-blog-container"
                >

                    <div
                        class="renew-you-blog-message"
                    >

                        <div style="
                            font-size:2.5rem;
                            margin-bottom:12px;
                        ">
                            404
                        </div>

                        <h1 style="
                            margin:0 0 8px;
                            color:var(--purple-primary,#3E0D5F);
                        ">
                            Article Not Found
                        </h1>

                        <p>
                            We could not find that blog article.
                        </p>

                        <a
                            href="blog.html"
                            class="renew-you-blog-read-more"
                        >
                            ← Return to Blog
                        </a>

                    </div>

                </div>

            </section>

        </main>

    `;

}


/* =========================================================
   EVENTS
========================================================= */

function bindBlogEvents() {

    const search =
        document.getElementById(
            'renewYouBlogSearch'
        );


    const category =
        document.getElementById(
            'renewYouBlogCategory'
        );


    if (search) {

        search.addEventListener(
            'input',
            event => {

                blogSearchQuery =
                    String(
                        event.target?.value ||
                        ''
                    )
                        .trim()
                        .toLowerCase();


                populateBlogPosts();

            }
        );

    }


    if (category) {

        category.addEventListener(
            'change',
            event => {

                blogCategoryFilter =
                    String(
                        event.target?.value ||
                        'all'
                    );


                populateBlogPosts();

            }
        );

    }

}


/* =========================================================
   URL / ARTICLE HELPERS
========================================================= */

function getBlogSlug() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    return String(
        params.get('slug') ||
        ''
    ).trim();

}


function formatBlogDate(
    value
) {

    if (!value) {
        return '';
    }


    const date =
        new Date(
            value
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return '';

    }


    return date.toLocaleDateString(
        'en-US',
        {
            month:'long',
            day:'numeric',
            year:'numeric'
        }
    );

}


function createExcerpt(
    content
) {

    const text =
        String(
            content ||
            ''
        )
            .replace(
                /\s+/g,
                ' '
            )
            .trim();


    if (
        text.length <= 180
    ) {

        return text;

    }


    return (
        text.slice(
            0,
            177
        ) +
        '...'
    );

}


function formatBlogContent(
    content
) {

    const paragraphs =
        String(
            content ||
            ''
        )
            .split(
                /\n\s*\n/
            )
            .map(
                paragraph =>
                    paragraph.trim()
            )
            .filter(Boolean);


    if (
        paragraphs.length === 0
    ) {

        return `
            <p>
                This article does not have any content yet.
            </p>
        `;

    }


    return paragraphs
        .map(
            paragraph => {

                const safe =
                    escapeHtml(
                        paragraph
                    )
                        .replace(
                            /\n/g,
                            '<br>'
                        );


                return `
                    <p>
                        ${safe}
                    </p>
                `;

            }
        )
        .join('');

}


function escapeHtml(
    value
) {

    return String(
        value == null
            ? ''
            : value
    )
        .replace(
            /&/g,
            '&amp;'
        )
        .replace(
            /</g,
            '&lt;'
        )
        .replace(
            />/g,
            '&gt;'
        )
        .replace(
            /"/g,
            '&quot;'
        )
        .replace(
            /'/g,
            '&#039;'
        );

}


/* =========================================================
   PAGE META
========================================================= */

function updateBlogPageMetadata(
    title,
    description
) {

    document.title =
        `${title} | ReNew You Health & Wellness`;


    let descriptionMeta =
        document.querySelector(
            'meta[name="description"]'
        );


    if (!descriptionMeta) {

        descriptionMeta =
            document.createElement(
                'meta'
            );

        descriptionMeta.name =
            'description';

        document.head.appendChild(
            descriptionMeta
        );

    }


    descriptionMeta.setAttribute(
        'content',
        String(
            description ||
            'ReNew You Health & Wellness Blog'
        )
    );

}


/* =========================================================
   ERROR
========================================================= */

function renderBlogError(
    target,
    message
) {

    if (!target) {
        return;
    }


    target.innerHTML = `

        <main class="renew-you-blog">

            <section
                class="renew-you-blog-content"
            >

                <div
                    class="renew-you-blog-container"
                >

                    <div
                        class="renew-you-blog-message blog-error"
                    >

                        <div style="
                            font-size:2rem;
                            margin-bottom:10px;
                        ">
                            ⚠️
                        </div>

                        <strong>
                            Unable to load the blog.
                        </strong>

                        <p>
                            ${escapeHtml(
                                message ||
                                'Please try again later.'
                            )}
                        </p>

                    </div>

                </div>

            </section>

        </main>

    `;


    injectBlogStyles();

}


/* =========================================================
   BLOG STYLES
   Injected so blog.html only needs the target.
========================================================= */

function injectBlogStyles() {

    if (
        document.getElementById(
            'renewYouBlogStyles'
        )
    ) {

        return;

    }


    const style =
        document.createElement(
            'style'
        );


    style.id =
        'renewYouBlogStyles';


    style.textContent = `

        .renew-you-blog {
            --blog-purple:
                var(
                    --purple-primary,
                    #3E0D5F
                );

            --blog-light:
                #8a349b;

            --blog-soft:
                #f7f1fa;

            --blog-text:
                #2d2631;

            --blog-muted:
                #6c6670;

            --blog-border:
                rgba(62,13,95,.10);

            width:100%;
            color:var(
                --blog-text
            );
        }


        .renew-you-blog *,
        .renew-you-blog
        *::before,
        .renew-you-blog
        *::after {
            box-sizing:border-box;
        }


        .renew-you-blog-container {
            width:min(
                1180px,
                calc(100% - 32px)
            );

            margin:0 auto;
        }


        .renew-you-blog-hero {
            padding:
                76px
                20px
                70px;

            color:#fff;

            background:
                radial-gradient(
                    circle at 85% 20%,
                    rgba(255,255,255,.14),
                    transparent 28%
                ),
                linear-gradient(
                    135deg,
                    #3E0D5F 0%,
                    #64247f 55%,
                    #8a349b 100%
                );
        }


        .renew-you-blog-hero
        .renew-you-blog-container {
            text-align:center;
        }


        .renew-you-blog-eyebrow {
            display:inline-flex;
            padding:7px 14px;
            border:1px solid
                rgba(255,255,255,.32);
            border-radius:999px;
            font-size:.72rem;
            font-weight:800;
            letter-spacing:.12em;
            text-transform:uppercase;
        }


        .renew-you-blog-hero h1 {
            margin:
                18px
                0
                12px;

            font-size:
                clamp(
                    2.1rem,
                    6vw,
                    4rem
                );

            line-height:1.04;
        }


        .renew-you-blog-hero p {
            max-width:700px;
            margin:0 auto;
            color:
                rgba(255,255,255,.88);
            font-size:1.02rem;
            line-height:1.7;
        }


        .renew-you-blog-content,
        .renew-you-blog-article-section {
            padding:
                42px
                0
                70px;

            background:#fbfafc;
        }


        .renew-you-blog-toolbar {
            display:grid;
            grid-template-columns:
                minmax(0,1fr)
                230px;

            gap:12px;
            margin-bottom:28px;
        }


        .renew-you-blog-search-wrap {
            min-height:48px;
            display:flex;
            align-items:center;
            gap:10px;
            padding:
                0
                14px;

            background:#fff;
            border:1px solid #ddd;
            border-radius:10px;
        }


        .renew-you-blog-search-wrap
        input {
            width:100%;
            min-width:0;
            border:0;
            outline:0;
            background:transparent;
            font:inherit;
        }


        .renew-you-blog-toolbar
        select {
            width:100%;
            min-height:48px;
            padding:
                10px
                13px;

            border:1px solid #ddd;
            border-radius:10px;
            background:#fff;
            font:inherit;
            outline:0;
        }


        .renew-you-blog-search-wrap:focus-within,
        .renew-you-blog-toolbar select:focus {
            border-color:
                var(
                    --purple-primary,
                    #3E0D5F
                );

            box-shadow:
                0 0 0 3px
                rgba(62,13,95,.08);
        }


        .renew-you-blog-grid {
            display:grid;
            grid-template-columns:
                repeat(
                    3,
                    minmax(0,1fr)
                );

            gap:22px;
        }


        .renew-you-blog-card {
            overflow:hidden;
            background:#fff;
            border:
                1px solid
                var(--blog-border);

            border-radius:17px;

            box-shadow:
                0 8px 25px
                rgba(62,13,95,.045);

            transition:
                transform .2s ease,
                box-shadow .2s ease;
        }


        .renew-you-blog-card:hover {
            transform:
                translateY(-3px);

            box-shadow:
                0 14px 34px
                rgba(62,13,95,.09);
        }


        .renew-you-blog-image-link,
        .renew-you-blog-card-image-placeholder {
            display:flex;
            width:100%;
            height:205px;
            align-items:center;
            justify-content:center;
            overflow:hidden;
            text-decoration:none;
            background:
                linear-gradient(
                    135deg,
                    #3E0D5F,
                    #8a349b
                );
        }


        .renew-you-blog-card-image {
            width:100%;
            height:100%;
            object-fit:cover;
            display:block;
        }


        .renew-you-blog-card-image-placeholder {
            color:#fff;
            font-size:1.3rem;
            font-weight:800;
        }


        .renew-you-blog-card-body {
            padding:21px;
        }


        .renew-you-blog-card-category {
            display:inline-block;
            margin-bottom:8px;
            color:var(--blog-light);
            font-size:.7rem;
            font-weight:800;
            letter-spacing:.07em;
            text-transform:uppercase;
        }


        .renew-you-blog-card h2 {
            margin:
                0
                0
                9px;

            color:var(--blog-purple);
            font-size:1.22rem;
            line-height:1.3;
        }


        .renew-you-blog-card p {
            margin:0;
            color:var(--blog-muted);
            font-size:.88rem;
            line-height:1.65;
        }


        .renew-you-blog-card-meta {
            display:flex;
            justify-content:space-between;
            gap:10px;
            margin-top:18px;
            color:#999;
            font-size:.72rem;
        }


        .renew-you-blog-read-more {
            display:inline-flex;
            align-items:center;
            gap:7px;
            margin-top:18px;
            color:var(--blog-purple);
            font-size:.84rem;
            font-weight:800;
            text-decoration:none;
        }


        .renew-you-blog-read-more:hover {
            color:var(--blog-light);
        }


        .renew-you-blog-message {
            grid-column:1 / -1;
            padding:55px 20px;
            text-align:center;
            border:
                1px solid
                var(--blog-border);
            border-radius:16px;
            background:#fff;
            color:var(--blog-muted);
        }


        .renew-you-blog-message p {
            margin:
                8px
                auto
                0;
            max-width:600px;
            line-height:1.6;
        }


        .renew-you-blog-message.blog-error {
            color:#b00020;
            background:#fff7f8;
        }


        .renew-you-blog-back {
            display:inline-flex;
            margin-bottom:22px;
            color:var(--blog-purple);
            font-size:.88rem;
            font-weight:800;
            text-decoration:none;
        }


        .renew-you-blog-article {
            width:100%;
            max-width:900px;
            min-width:0;
            overflow:hidden;
            margin:0 auto;
            background:#fff;
            border:
                1px solid
                var(--blog-border);
            border-radius:20px;
            box-shadow:
                0 10px 35px
                rgba(62,13,95,.06);
        }


        .renew-you-blog-article-image {
            display:block;
            width:100%;
            max-height:500px;
            object-fit:cover;
        }


        .renew-you-blog-article-body {
            width:100%;
            min-width:0;
            max-width:100%;
            padding:
                clamp(
                    25px,
                    5vw,
                    55px
                );
            overflow-wrap:anywhere;
            word-break:break-word;
        }


        .renew-you-blog-article-body h1 {
            margin:
                10px
                0
                12px;

            color:var(--blog-purple);

            /*
             * Keep article titles strong without allowing them
             * to dominate the page on desktop or mobile.
             */
            font-size:
                clamp(
                    1.75rem,
                    3.6vw,
                    2.65rem
                );

            line-height:1.12;
            overflow-wrap:anywhere;
            word-break:normal;
        }


        .renew-you-blog-article-meta {
            color:#999;
            font-size:.8rem;
            margin-bottom:28px;
        }


        .renew-you-blog-article-excerpt {
            padding-bottom:22px;
            margin:0 0 25px !important;
            border-bottom:
                1px solid
                #eee;

            color:#555 !important;
            font-size:1.04rem !important;
            line-height:1.75 !important;
            font-weight:600;
        }


        .renew-you-blog-article-content {
            width:100%;
            max-width:100%;
            min-width:0;
            overflow-wrap:anywhere;
            word-break:break-word;
        }

        .renew-you-blog-article-content p {
            margin:
                0
                0
                20px;

            color:#4f4952;
            font-size:1rem;
            line-height:1.85;
            overflow-wrap:anywhere;
            word-break:break-word;
        }

        .renew-you-blog-article-content * {
            max-width:100%;
        }

        .renew-you-blog-article-content img {
            display:block;
            width:auto;
            max-width:100%;
            height:auto;
        }


        .renew-you-blog-engagement {
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap:18px;
            flex-wrap:wrap;
            margin:0 0 28px;
            padding:16px 0;
            border-top:1px solid #eee;
            border-bottom:1px solid #eee;
        }


        .renew-you-blog-like-btn {
            display:inline-flex;
            align-items:center;
            justify-content:center;
            gap:8px;
            min-height:42px;
            padding:9px 15px;
            border:1px solid rgba(62,13,95,.16);
            border-radius:999px;
            background:#fff;
            color:var(--blog-purple);
            font:inherit;
            font-size:.88rem;
            font-weight:800;
            cursor:pointer;
            transition:
                background .2s ease,
                color .2s ease,
                border-color .2s ease,
                transform .2s ease;
        }


        .renew-you-blog-like-btn:hover {
            transform:translateY(-1px);
            border-color:var(--blog-purple);
            background:var(--blog-soft);
        }


        .renew-you-blog-like-btn.is-liked {
            border-color:var(--blog-purple);
            background:var(--blog-purple);
            color:#fff;
        }


        .renew-you-blog-like-btn:disabled {
            opacity:.65;
            cursor:not-allowed;
            transform:none;
        }


        .renew-you-blog-like-icon {
            font-size:1.1rem;
            line-height:1;
        }


        .renew-you-blog-like-count {
            min-width:1.1em;
            text-align:center;
        }


        .renew-you-blog-share-group {
            display:flex;
            align-items:center;
            justify-content:flex-end;
            gap:7px;
            flex-wrap:wrap;
        }


        .renew-you-blog-share-label {
            margin-right:3px;
            color:var(--blog-muted);
            font-size:.78rem;
            font-weight:800;
        }


        .renew-you-blog-share-btn {
            display:inline-flex;
            align-items:center;
            justify-content:center;
            width:36px;
            height:36px;
            padding:0;
            border:1px solid rgba(62,13,95,.13);
            border-radius:50%;
            background:#fff;
            color:var(--blog-purple);
            font:inherit;
            font-size:.72rem;
            font-weight:900;
            text-decoration:none;
            cursor:pointer;
            transition:
                transform .2s ease,
                background .2s ease,
                color .2s ease,
                border-color .2s ease;
        }


        .renew-you-blog-share-btn:hover {
            transform:translateY(-2px);
            border-color:var(--blog-purple);
            background:var(--blog-soft);
        }


        .renew-you-blog-share-native,
        .renew-you-blog-share-copy {
            font-size:1rem;
        }


        .renew-you-blog-engagement-status {
            width:100%;
            min-height:18px;
            margin-top:-4px;
            color:#777;
            font-size:.76rem;
            line-height:1.4;
        }


        .renew-you-blog-engagement-status.is-success {
            color:#267a3d;
        }


        .renew-you-blog-engagement-status.is-error {
            color:#b00020;
        }


        @media (max-width:900px) {

            .renew-you-blog-grid {
                grid-template-columns:
                    repeat(
                        2,
                        minmax(0,1fr)
                    );
            }

        }


        @media (max-width:680px) {

            .renew-you-blog-hero {
                padding:
                    52px
                    16px;
            }

            .renew-you-blog-hero h1 {
                font-size:
                    clamp(
                        1.9rem,
                        8vw,
                        2.45rem
                    );
                line-height:1.08;
            }

            .renew-you-blog-hero p {
                font-size:.94rem;
                line-height:1.6;
            }


            .renew-you-blog-container {
                width:calc(100% - 24px);
                max-width:1180px;
                min-width:0;
            }

            .renew-you-blog-article {
                border-radius:14px;
            }

            .renew-you-blog-article-body {
                padding:24px 20px 30px;
            }

            .renew-you-blog-article-body h1 {
                font-size:
                    clamp(
                        1.7rem,
                        7.2vw,
                        2.2rem
                    );
                line-height:1.12;
                margin-top:8px;
            }

            .renew-you-blog-article-meta {
                font-size:.76rem;
                line-height:1.5;
                margin-bottom:22px;
            }

            .renew-you-blog-article-excerpt {
                font-size:.96rem !important;
                line-height:1.65 !important;
            }

            .renew-you-blog-article-content p {
                font-size:.96rem;
                line-height:1.75;
            }

            .renew-you-blog-article-image {
                width:100%;
                height:auto;
                max-height:340px;
                object-fit:cover;
            }


            .renew-you-blog-engagement {
                align-items:flex-start;
                flex-direction:column;
                gap:12px;
            }


            .renew-you-blog-share-group {
                justify-content:flex-start;
                width:100%;
            }


            .renew-you-blog-share-label {
                width:100%;
                margin-right:0;
            }


            .renew-you-blog-like-btn {
                width:100%;
            }


            .renew-you-blog-toolbar {
                grid-template-columns:1fr;
            }


            .renew-you-blog-grid {
                grid-template-columns:1fr;
            }


            .renew-you-blog-card-image,
            .renew-you-blog-image-link,
            .renew-you-blog-card-image-placeholder {
                height:190px;
            }

        }

        @media (max-width:420px) {

            .renew-you-blog-container {
                width:calc(100% - 20px);
            }

            .renew-you-blog-article-body {
                padding:22px 16px 28px;
            }

            .renew-you-blog-article-body h1 {
                font-size:1.65rem;
            }

            .renew-you-blog-article-content p {
                font-size:.94rem;
                line-height:1.7;
            }

        }

    `;


    document.head.appendChild(
        style
    );

}
