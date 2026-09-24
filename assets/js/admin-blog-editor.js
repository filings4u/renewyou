/**
 * ReNew You Health & Wellness - Management Workspace Blog Editor
 * Adds a dedicated rich-text Blog Editor and a separate Blog Posts manager.
 */
(function () {
    'use strict';

    const PROJECT_URL = 'https://eybsgwzpisgswmxcwjel.supabase.co';
    const PUBLISHABLE_KEY = 'sb_publishable_R_kVcbPeNKKDIVQM8l2gZQ_6fUa4weF';
    const BLOG_IMAGE_BUCKET = 'blog-images';
    const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
    const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

    let client = null;
    let currentPostId = null;
    let posts = [];
    let slugWasManuallyEdited = false;
    let seoTitleWasManuallyEdited = false;
    let seoDescriptionWasManuallyEdited = false;
    let savedRange = null;
    let initialized = false;

    document.addEventListener('DOMContentLoaded', () => {
        waitForWorkspace();
    });

    function waitForWorkspace() {
        if (document.getElementById('blogPage') && document.querySelector('.admin-page-nav')) {
            initialize();
            return;
        }

        const observer = new MutationObserver(() => {
            if (document.getElementById('blogPage') && document.querySelector('.admin-page-nav')) {
                observer.disconnect();
                initialize();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    async function initialize() {
        if (initialized) return;
        initialized = true;

        if (!window.supabase || typeof window.supabase.createClient !== 'function') return;
        client = window.supabase.createClient(PROJECT_URL, PUBLISHABLE_KEY);

        const authorized = await verifyAdmin();
        if (!authorized) return;

        injectStyles();
        rebuildBlogNavigation();
        renderEditorPage();
        renderPostsPage();
        bindEditorEvents();
        bindPostsEvents();
        ensurePreviewModal();
        await loadPosts();
        newPost();
    }

    async function verifyAdmin() {
        try {
            const { data: sessionData } = await client.auth.getSession();
            const session = sessionData?.session;
            if (!session?.user?.id) return false;

            const { data, error } = await client
                .from('admin_profiles')
                .select('id, role, active')
                .eq('id', session.user.id)
                .maybeSingle();

            if (error) throw error;
            return Boolean(data && data.active !== false && String(data.role || '').toLowerCase() === 'admin');
        } catch (error) {
            console.error('Blog editor authorization error:', error);
            return false;
        }
    }

    function rebuildBlogNavigation() {
        const nav = document.querySelector('.admin-page-nav');
        const existingBlogButton = nav?.querySelector('[data-page="blogPage"]');
        if (!nav || !existingBlogButton) return;

        existingBlogButton.innerHTML = '✍️ Blog Editor';

        if (!nav.querySelector('[data-page="blogPostsPage"]')) {
            const postsButton = document.createElement('button');
            postsButton.type = 'button';
            postsButton.className = 'admin-page-tab';
            postsButton.setAttribute('data-page', 'blogPostsPage');
            postsButton.innerHTML = '🗂️ Blog Posts';
            existingBlogButton.insertAdjacentElement('afterend', postsButton);

            postsButton.addEventListener('click', () => {
                showWorkspacePage('blogPostsPage', postsButton);
                loadPosts();
            });
        }

        document.querySelectorAll('.admin-page-tab').forEach((button) => {
            if (button.getAttribute('data-page') === 'blogPostsPage') return;
            button.addEventListener('click', () => {
                document.getElementById('blogPostsPage')?.classList.remove('active');
            });
        });

        existingBlogButton.addEventListener('click', () => {
            updateEditorPreview();
        });
    }

    function showWorkspacePage(pageId, tabButton) {
        document.querySelectorAll('.admin-page').forEach((page) => page.classList.remove('active'));
        document.querySelectorAll('.admin-page-tab').forEach((button) => button.classList.remove('active'));
        document.getElementById(pageId)?.classList.add('active');
        tabButton?.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function renderEditorPage() {
        const page = document.getElementById('blogPage');
        if (!page) return;

        page.innerHTML = `
            <div class="ry-blog-page-head">
                <div>
                    <span class="ry-blog-kicker">CONTENT MANAGEMENT</span>
                    <h1 id="ryBlogEditorHeading">Create Blog Post</h1>
                    <p>Write, format, optimize, preview, and publish from one page.</p>
                </div>
                <div class="ry-blog-head-actions">
                    <button type="button" class="ry-btn ry-btn-ghost" id="ryNewPostBtn">+ New Post</button>
                    <button type="button" class="ry-btn ry-btn-ghost" id="ryOpenPostsBtn">View All Posts</button>
                    <button type="button" class="ry-btn ry-btn-ghost" onclick="window.open('blog.html','_blank')">↗ Public Blog</button>
                </div>
            </div>

            <div class="ry-blog-editor-layout">
                <main class="ry-blog-editor-main">
                    <section class="ry-blog-panel">
                        <div class="ry-field">
                            <label for="ryBlogTitle">Title <span>Required</span></label>
                            <input id="ryBlogTitle" type="text" maxlength="180" placeholder="Enter the article title">
                        </div>

                        <div class="ry-field">
                            <label for="ryBlogSlug">URL Slug <span>Created automatically from the title</span></label>
                            <div class="ry-slug-row">
                                <span>renewyouhealthwellness.com/blog.html?slug=</span>
                                <input id="ryBlogSlug" type="text" maxlength="180" placeholder="article-title">
                                <button type="button" class="ry-mini-btn" id="ryRegenerateSlugBtn">Regenerate</button>
                            </div>
                        </div>

                        <div class="ry-two-col">
                            <div class="ry-field">
                                <label for="ryBlogCategory">Category</label>
                                <input id="ryBlogCategory" type="text" maxlength="80" placeholder="Weight Management">
                            </div>
                            <div class="ry-field">
                                <label for="ryBlogAuthor">Author</label>
                                <input id="ryBlogAuthor" type="text" maxlength="100" value="ReNew You Health & Wellness">
                            </div>
                        </div>

                        <div class="ry-field">
                            <label>Featured Image</label>
                            <div class="ry-image-controls">
                                <input id="ryBlogImageFile" type="file" accept="image/jpeg,image/png,image/webp,image/gif">
                                <span>or</span>
                                <input id="ryBlogImageUrl" type="url" placeholder="https://... image URL">
                            </div>
                            <div class="ry-feature-image-preview" id="ryFeatureImagePreview" hidden>
                                <img id="ryFeatureImagePreviewImg" alt="Featured image preview">
                                <button type="button" class="ry-mini-btn danger" id="ryRemoveImageBtn">Remove</button>
                            </div>
                            <small>JPG, PNG, WEBP, or GIF. Upload limit: 5 MB.</small>
                        </div>

                        <div class="ry-field">
                            <label for="ryBlogExcerpt">Excerpt <span id="ryExcerptCount">0 / 500</span></label>
                            <textarea id="ryBlogExcerpt" maxlength="500" rows="4" placeholder="Short summary used on blog cards and as the default SEO description."></textarea>
                        </div>

                        <div class="ry-field ry-content-field">
                            <label>Article Content <span id="ryWordCount">0 words · 1 min read</span></label>

                            <div class="ry-rich-toolbar" id="ryRichToolbar" role="toolbar" aria-label="Blog formatting toolbar">
                                <select id="ryBlockFormat" title="Paragraph style" aria-label="Paragraph style">
                                    <option value="p">Paragraph</option>
                                    <option value="h2">Heading 2</option>
                                    <option value="h3">Heading 3</option>
                                    <option value="blockquote">Quote</option>
                                </select>
                                <select id="ryFontFamily" title="Font" aria-label="Font family">
                                    <option value="">Font</option>
                                    <option value="Arial">Arial</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Helvetica">Helvetica</option>
                                    <option value="Times New Roman">Times New Roman</option>
                                    <option value="Trebuchet MS">Trebuchet MS</option>
                                    <option value="Verdana">Verdana</option>
                                </select>
                                <select id="ryFontSize" title="Font size" aria-label="Font size">
                                    <option value="">Size</option>
                                    <option value="2">Small</option>
                                    <option value="3">Normal</option>
                                    <option value="4">Large</option>
                                    <option value="5">X-Large</option>
                                </select>
                                <span class="ry-toolbar-divider"></span>
                                <button type="button" data-command="bold" title="Bold"><strong>B</strong></button>
                                <button type="button" data-command="italic" title="Italic"><em>I</em></button>
                                <button type="button" data-command="underline" title="Underline"><u>U</u></button>
                                <button type="button" data-command="insertUnorderedList" title="Bulleted list">• List</button>
                                <button type="button" data-command="insertOrderedList" title="Numbered list">1. List</button>
                                <span class="ry-toolbar-divider"></span>
                                <button type="button" data-command="justifyLeft" title="Align left">⇤</button>
                                <button type="button" data-command="justifyCenter" title="Center">↔</button>
                                <button type="button" data-command="justifyRight" title="Align right">⇥</button>
                                <button type="button" id="ryInsertLinkBtn" title="Insert link">🔗 Link</button>
                                <button type="button" data-command="unlink" title="Remove link">Unlink</button>
                                <span class="ry-toolbar-divider"></span>
                                <select id="ryLineSpacing" title="Line spacing" aria-label="Line spacing">
                                    <option value="">Line spacing</option>
                                    <option value="1.4">1.4</option>
                                    <option value="1.6">1.6</option>
                                    <option value="1.8">1.8</option>
                                    <option value="2">2.0</option>
                                </select>
                                <select id="ryParagraphSpacing" title="Paragraph spacing" aria-label="Paragraph spacing">
                                    <option value="">Paragraph spacing</option>
                                    <option value="12px">12 px</option>
                                    <option value="18px">18 px</option>
                                    <option value="24px">24 px</option>
                                    <option value="32px">32 px</option>
                                </select>
                                <button type="button" data-command="undo" title="Undo">↶</button>
                                <button type="button" data-command="redo" title="Redo">↷</button>
                                <button type="button" data-command="removeFormat" title="Clear formatting">Clear</button>
                            </div>

                            <div id="ryBlogContentEditor" class="ry-rich-editor" contenteditable="true" data-placeholder="Start writing your article..."></div>
                        </div>
                    </section>

                    <section class="ry-blog-panel ry-preview-panel" id="ryInlinePreviewPanel">
                        <div class="ry-panel-title-row">
                            <div>
                                <span class="ry-blog-kicker">LIVE PREVIEW</span>
                                <h2>Article Preview</h2>
                            </div>
                            <button type="button" class="ry-btn ry-btn-ghost" id="ryFullPreviewBtn">Open Full Preview</button>
                        </div>
                        <div id="ryInlinePreview" class="ry-article-preview"></div>
                    </section>
                </main>

                <aside class="ry-blog-editor-side">
                    <section class="ry-blog-panel ry-sticky-panel">
                        <div class="ry-panel-title-row">
                            <div>
                                <span class="ry-blog-kicker">PUBLISHING</span>
                                <h2>Post Settings</h2>
                            </div>
                            <span id="ryEditingStatusBadge" class="ry-status-badge draft">New</span>
                        </div>

                        <div class="ry-field">
                            <label for="ryBlogStatus">Status</label>
                            <select id="ryBlogStatus">
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

                        <div class="ry-publish-actions">
                            <button type="button" class="ry-btn ry-btn-secondary" id="rySaveDraftBtn">Save Draft</button>
                            <button type="button" class="ry-btn ry-btn-primary" id="ryPublishBtn">Publish Post</button>
                        </div>

                        <div id="ryBlogSaveMessage" class="ry-save-message" hidden></div>
                    </section>

                    <section class="ry-blog-panel">
                        <span class="ry-blog-kicker">SEARCH ENGINE OPTIMIZATION</span>
                        <h2>SEO Settings</h2>

                        <div class="ry-field">
                            <label for="rySeoTitle">SEO Title <span id="rySeoTitleCount">0 / 60</span></label>
                            <input id="rySeoTitle" type="text" maxlength="180" placeholder="Search result title">
                            <small>Recommended: about 50–60 characters.</small>
                        </div>

                        <div class="ry-field">
                            <label for="rySeoDescription">Meta Description <span id="rySeoDescriptionCount">0 / 160</span></label>
                            <textarea id="rySeoDescription" maxlength="320" rows="5" placeholder="Describe the article for search results."></textarea>
                            <small>Recommended: about 140–160 characters.</small>
                        </div>

                        <div class="ry-seo-checklist" id="rySeoChecklist"></div>

                        <div class="ry-google-preview">
                            <div class="ry-google-label">Google preview</div>
                            <div class="ry-google-title" id="ryGoogleTitle">Article title</div>
                            <div class="ry-google-url" id="ryGoogleUrl">https://renewyouhealthwellness.com/blog.html?slug=</div>
                            <div class="ry-google-description" id="ryGoogleDescription">Your meta description will appear here.</div>
                        </div>
                    </section>
                </aside>
            </div>
        `;

        try { document.execCommand('defaultParagraphSeparator', false, 'p'); } catch (_) {}
    }

    function renderPostsPage() {
        const editorPage = document.getElementById('blogPage');
        if (!editorPage || document.getElementById('blogPostsPage')) return;

        const page = document.createElement('section');
        page.id = 'blogPostsPage';
        page.className = 'admin-page';
        page.innerHTML = `
            <div class="ry-blog-page-head">
                <div>
                    <span class="ry-blog-kicker">BLOG LIBRARY</span>
                    <h1>All Blog Posts</h1>
                    <p>Review every article, then edit, view, or delete it from one place.</p>
                </div>
                <div class="ry-blog-head-actions">
                    <button type="button" class="ry-btn ry-btn-primary" id="ryCreateFromPostsBtn">+ Create New Post</button>
                    <button type="button" class="ry-btn ry-btn-ghost" id="ryRefreshPostsBtn">Refresh</button>
                </div>
            </div>

            <div class="ry-blog-metrics">
                <div><span>Total</span><strong id="ryPostsTotal">0</strong></div>
                <div><span>Published</span><strong id="ryPostsPublished">0</strong></div>
                <div><span>Drafts</span><strong id="ryPostsDraft">0</strong></div>
                <div><span>SEO Ready</span><strong id="ryPostsSeoReady">0</strong></div>
            </div>

            <section class="ry-blog-panel">
                <div class="ry-posts-toolbar">
                    <input id="ryPostsSearch" type="search" placeholder="Search title, category, author, or slug...">
                    <select id="ryPostsStatusFilter">
                        <option value="all">All statuses</option>
                        <option value="published">Published</option>
                        <option value="draft">Drafts</option>
                    </select>
                    <select id="ryPostsCategoryFilter">
                        <option value="all">All categories</option>
                    </select>
                </div>
                <div id="ryPostsTableTarget" class="ry-posts-table-wrap">
                    <div class="ry-empty-state">Loading blog posts...</div>
                </div>
            </section>
        `;

        editorPage.insertAdjacentElement('afterend', page);
    }

    function bindEditorEvents() {
        const editor = byId('ryBlogContentEditor');
        const title = byId('ryBlogTitle');
        const slug = byId('ryBlogSlug');
        const excerpt = byId('ryBlogExcerpt');
        const seoTitle = byId('rySeoTitle');
        const seoDescription = byId('rySeoDescription');
        const imageUrl = byId('ryBlogImageUrl');
        const file = byId('ryBlogImageFile');

        byId('ryNewPostBtn')?.addEventListener('click', newPost);
        byId('ryOpenPostsBtn')?.addEventListener('click', () => {
            showWorkspacePage('blogPostsPage', document.querySelector('[data-page="blogPostsPage"]'));
            loadPosts();
        });
        byId('ryRegenerateSlugBtn')?.addEventListener('click', () => {
            slugWasManuallyEdited = false;
            slug.value = slugify(title.value);
            updateAllPreviews();
        });

        title?.addEventListener('input', () => {
            if (!slugWasManuallyEdited) slug.value = slugify(title.value);
            if (!seoTitleWasManuallyEdited) seoTitle.value = title.value;
            updateAllPreviews();
        });
        slug?.addEventListener('input', () => {
            slugWasManuallyEdited = Boolean(slug.value.trim());
            slug.value = slugify(slug.value);
            updateAllPreviews();
        });
        excerpt?.addEventListener('input', () => {
            if (!seoDescriptionWasManuallyEdited) seoDescription.value = excerpt.value.slice(0, 160);
            updateAllPreviews();
        });
        seoTitle?.addEventListener('input', () => {
            seoTitleWasManuallyEdited = true;
            updateAllPreviews();
        });
        seoDescription?.addEventListener('input', () => {
            seoDescriptionWasManuallyEdited = true;
            updateAllPreviews();
        });

        ['ryBlogCategory', 'ryBlogAuthor'].forEach((id) => {
            byId(id)?.addEventListener('input', updateAllPreviews);
            byId(id)?.addEventListener('change', updateAllPreviews);
        });
        byId('ryBlogStatus')?.addEventListener('change', () => {
            updatePostStatusAfterSelection();
            updateAllPreviews();
        });

        imageUrl?.addEventListener('input', () => {
            if (!file?.files?.[0]) setFeaturedImagePreview(imageUrl.value.trim());
            updateAllPreviews();
        });
        file?.addEventListener('change', handleImageSelection);
        byId('ryRemoveImageBtn')?.addEventListener('click', removeImageSelection);

        editor?.addEventListener('input', () => {
            saveSelection();
            updateAllPreviews();
        });
        ['keyup', 'mouseup', 'focus'].forEach((eventName) => editor?.addEventListener(eventName, saveSelection));

        document.querySelectorAll('#ryRichToolbar button[data-command]').forEach((button) => {
            button.addEventListener('mousedown', (event) => event.preventDefault());
            button.addEventListener('click', () => runCommand(button.dataset.command));
        });

        byId('ryBlockFormat')?.addEventListener('change', (event) => {
            runCommand('formatBlock', event.target.value);
            event.target.value = 'p';
        });
        byId('ryFontFamily')?.addEventListener('change', (event) => {
            if (event.target.value) runCommand('fontName', event.target.value);
            event.target.value = '';
        });
        byId('ryFontSize')?.addEventListener('change', (event) => {
            if (event.target.value) runCommand('fontSize', event.target.value);
            event.target.value = '';
        });
        byId('ryLineSpacing')?.addEventListener('change', (event) => {
            if (event.target.value) applyBlockStyle('lineHeight', event.target.value);
            event.target.value = '';
        });
        byId('ryParagraphSpacing')?.addEventListener('change', (event) => {
            if (event.target.value) applyBlockStyle('marginBottom', event.target.value);
            event.target.value = '';
        });
        byId('ryInsertLinkBtn')?.addEventListener('mousedown', (event) => event.preventDefault());
        byId('ryInsertLinkBtn')?.addEventListener('click', insertLink);

        byId('rySaveDraftBtn')?.addEventListener('click', () => savePost('draft'));
        byId('ryPublishBtn')?.addEventListener('click', () => savePost('published'));
        byId('ryFullPreviewBtn')?.addEventListener('click', () => openPreview(getFormPost()));
    }

    function bindPostsEvents() {
        byId('ryCreateFromPostsBtn')?.addEventListener('click', () => {
            newPost();
            showWorkspacePage('blogPage', document.querySelector('[data-page="blogPage"]'));
        });
        byId('ryRefreshPostsBtn')?.addEventListener('click', loadPosts);
        byId('ryPostsSearch')?.addEventListener('input', renderPostsList);
        byId('ryPostsStatusFilter')?.addEventListener('change', renderPostsList);
        byId('ryPostsCategoryFilter')?.addEventListener('change', renderPostsList);
        byId('ryPostsTableTarget')?.addEventListener('click', handlePostListClick);
    }

    function runCommand(command, value = null) {
        const editor = byId('ryBlogContentEditor');
        if (!editor) return;
        restoreSelection();
        editor.focus();
        try { document.execCommand(command, false, value); } catch (error) { console.warn(error); }
        saveSelection();
        updateAllPreviews();
    }

    function saveSelection() {
        const editor = byId('ryBlogContentEditor');
        const selection = window.getSelection();
        if (!editor || !selection || !selection.rangeCount) return;
        const range = selection.getRangeAt(0);
        if (editor.contains(range.commonAncestorContainer)) savedRange = range.cloneRange();
    }

    function restoreSelection() {
        if (!savedRange) return;
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(savedRange);
    }

    function applyBlockStyle(property, value) {
        const editor = byId('ryBlogContentEditor');
        if (!editor) return;
        restoreSelection();
        const selection = window.getSelection();
        if (!selection?.rangeCount) return;
        let node = selection.getRangeAt(0).startContainer;
        if (node.nodeType === Node.TEXT_NODE) node = node.parentElement;
        const block = node?.closest?.('p,h2,h3,h4,blockquote,li,div') || editor;
        if (block && editor.contains(block)) block.style[property] = value;
        updateAllPreviews();
    }

    function insertLink() {
        restoreSelection();
        const url = window.prompt('Enter the link URL (https://...)');
        if (!url) return;
        const trimmed = url.trim();
        if (!/^https?:\/\//i.test(trimmed) && !/^mailto:/i.test(trimmed) && !/^tel:/i.test(trimmed)) {
            alert('Please enter a complete http:// or https:// URL, email link, or telephone link.');
            return;
        }
        runCommand('createLink', trimmed);
    }

    async function handleImageSelection(event) {
        const file = event.target.files?.[0];
        if (!file) return;
        if (!IMAGE_TYPES.includes(file.type)) {
            alert('Please choose a JPG, PNG, WEBP, or GIF image.');
            event.target.value = '';
            return;
        }
        if (file.size > MAX_IMAGE_SIZE) {
            alert('The featured image must be 5 MB or smaller.');
            event.target.value = '';
            return;
        }
        const objectUrl = URL.createObjectURL(file);
        setFeaturedImagePreview(objectUrl);
        updateAllPreviews();
    }

    function removeImageSelection() {
        const file = byId('ryBlogImageFile');
        const url = byId('ryBlogImageUrl');
        if (file) file.value = '';
        if (url) url.value = '';
        setFeaturedImagePreview('');
        updateAllPreviews();
    }

    function setFeaturedImagePreview(url) {
        const wrap = byId('ryFeatureImagePreview');
        const image = byId('ryFeatureImagePreviewImg');
        if (!wrap || !image) return;
        if (!url) {
            wrap.hidden = true;
            image.removeAttribute('src');
            return;
        }
        image.src = url;
        wrap.hidden = false;
    }

    async function uploadFeaturedImage(file, slug) {
        if (!file) return '';
        const extension = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
        const id = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        const path = `blog/${slugify(slug || 'blog-post')}-${Date.now()}-${id}.${extension}`;
        const { error } = await client.storage.from(BLOG_IMAGE_BUCKET).upload(path, file, {
            cacheControl: '3600',
            contentType: file.type,
            upsert: false
        });
        if (error) throw error;
        return client.storage.from(BLOG_IMAGE_BUCKET).getPublicUrl(path).data?.publicUrl || '';
    }

    function newPost() {
        currentPostId = null;
        slugWasManuallyEdited = false;
        seoTitleWasManuallyEdited = false;
        seoDescriptionWasManuallyEdited = false;
        savedRange = null;

        setValue('ryBlogTitle', '');
        setValue('ryBlogSlug', '');
        setValue('ryBlogCategory', '');
        setValue('ryBlogAuthor', 'ReNew You Health & Wellness');
        setValue('ryBlogImageUrl', '');
        setValue('ryBlogExcerpt', '');
        setValue('ryBlogStatus', 'draft');
        setValue('rySeoTitle', '');
        setValue('rySeoDescription', '');
        const file = byId('ryBlogImageFile');
        if (file) file.value = '';
        const editor = byId('ryBlogContentEditor');
        if (editor) editor.innerHTML = '';
        setFeaturedImagePreview('');
        byId('ryBlogEditorHeading').textContent = 'Create Blog Post';
        setStatusBadge('New', 'draft');
        hideSaveMessage();
        updateAllPreviews();
    }

    function loadPostIntoEditor(post) {
        if (!post) return;
        currentPostId = post.id;
        slugWasManuallyEdited = true;
        seoTitleWasManuallyEdited = Boolean(post.seo_title);
        seoDescriptionWasManuallyEdited = Boolean(post.seo_description);

        setValue('ryBlogTitle', post.title || '');
        setValue('ryBlogSlug', post.slug || slugify(post.title));
        setValue('ryBlogCategory', post.category || '');
        setValue('ryBlogAuthor', post.author || 'ReNew You Health & Wellness');
        setValue('ryBlogImageUrl', post.featured_image_url || '');
        setValue('ryBlogExcerpt', post.excerpt || post.summary || '');
        setValue('ryBlogStatus', String(post.status).toLowerCase() === 'published' ? 'published' : 'draft');
        setValue('rySeoTitle', post.seo_title || post.title || '');
        setValue('rySeoDescription', post.seo_description || post.excerpt || '');

        const editor = byId('ryBlogContentEditor');
        if (editor) editor.innerHTML = contentToEditorHtml(post.content || '');
        const file = byId('ryBlogImageFile');
        if (file) file.value = '';
        setFeaturedImagePreview(post.featured_image_url || '');
        byId('ryBlogEditorHeading').textContent = `Edit: ${post.title || 'Blog Post'}`;
        setStatusBadge(post.status === 'published' ? 'Published' : 'Draft', post.status);
        hideSaveMessage();
        updateAllPreviews();
    }

    async function savePost(forcedStatus) {
        const title = getValue('ryBlogTitle').trim();
        const slug = slugify(getValue('ryBlogSlug') || title);
        const editor = byId('ryBlogContentEditor');
        const contentHtml = sanitizeEditorHtml(editor?.innerHTML || '');
        const plainText = editor?.innerText?.trim() || '';

        if (!title) return showSaveMessage('Enter a blog title before saving.', 'error');
        if (!slug) return showSaveMessage('A valid slug is required.', 'error');
        if (!plainText) return showSaveMessage('Add article content before saving.', 'error');

        setDisabled(true);
        showSaveMessage('Saving your blog post...', 'info');

        try {
            let imageUrl = getValue('ryBlogImageUrl').trim();
            const imageFile = byId('ryBlogImageFile')?.files?.[0];
            if (imageFile) {
                showSaveMessage('Uploading the featured image...', 'info');
                imageUrl = await uploadFeaturedImage(imageFile, slug);
            }

            const existing = posts.find((item) => String(item.id) === String(currentPostId));
            const status = forcedStatus || getValue('ryBlogStatus') || 'draft';
            const wordCount = countWords(plainText);
            const readTime = Math.max(1, Math.ceil(wordCount / 225));
            const excerpt = getValue('ryBlogExcerpt').trim();
            const seoTitle = getValue('rySeoTitle').trim() || title;
            const seoDescription = getValue('rySeoDescription').trim() || excerpt.slice(0, 160);

            const payload = {
                title,
                slug,
                summary: excerpt,
                excerpt: excerpt || null,
                content: contentHtml,
                featured_image_url: imageUrl || null,
                cover_image_url: imageUrl || null,
                category: getValue('ryBlogCategory').trim() || 'Health & Wellness',
                author: getValue('ryBlogAuthor').trim() || 'ReNew You Health & Wellness',
                status: status === 'published' ? 'published' : 'draft',
                is_published: status === 'published',
                seo_title: seoTitle,
                seo_description: seoDescription,
                read_time_minutes: readTime,
                updated_at: new Date().toISOString(),
                published_at: status === 'published' ? (existing?.published_at || new Date().toISOString()) : null
            };

            let result;
            if (currentPostId) {
                result = await client.from('blog_posts').update(payload).eq('id', currentPostId).select('*').single();
            } else {
                result = await client.from('blog_posts').insert(payload).select('*').single();
            }
            if (result.error) throw result.error;

            currentPostId = result.data.id;
            setValue('ryBlogImageUrl', result.data.featured_image_url || '');
            const fileInput = byId('ryBlogImageFile');
            if (fileInput) fileInput.value = '';
            setFeaturedImagePreview(result.data.featured_image_url || '');
            setValue('ryBlogStatus', payload.status);
            setStatusBadge(payload.status === 'published' ? 'Published' : 'Draft', payload.status);
            byId('ryBlogEditorHeading').textContent = `Edit: ${result.data.title}`;
            showSaveMessage(payload.status === 'published' ? 'Published successfully.' : 'Draft saved successfully.', 'success');
            await loadPosts(false);
        } catch (error) {
            console.error('Rich blog save error:', error);
            showSaveMessage(error?.message || 'Unable to save the blog post.', 'error');
        } finally {
            setDisabled(false);
        }
    }

    async function loadPosts(renderList = true) {
        try {
            const { data, error } = await client
                .from('blog_posts')
                .select('id,title,slug,summary,excerpt,content,featured_image_url,cover_image_url,category,author,status,is_published,published_at,created_at,updated_at,seo_title,seo_description,read_time_minutes,likes_count')
                .order('created_at', { ascending: false });
            if (error) throw error;
            posts = Array.isArray(data) ? data : [];
            updatePostMetrics();
            updateCategoryFilter();
            if (renderList) renderPostsList();
        } catch (error) {
            console.error('Blog list load error:', error);
            const target = byId('ryPostsTableTarget');
            if (target) target.innerHTML = `<div class="ry-empty-state error">Unable to load blog posts: ${escapeHtml(error?.message || 'Unknown error')}</div>`;
        }
    }

    function renderPostsList() {
        const target = byId('ryPostsTableTarget');
        if (!target) return;
        const query = getValue('ryPostsSearch').toLowerCase().trim();
        const status = getValue('ryPostsStatusFilter') || 'all';
        const category = getValue('ryPostsCategoryFilter') || 'all';

        const filtered = posts.filter((post) => {
            const haystack = [post.title, post.slug, post.category, post.author].join(' ').toLowerCase();
            const postStatus = String(post.status || 'draft').toLowerCase();
            return (!query || haystack.includes(query)) && (status === 'all' || postStatus === status) && (category === 'all' || String(post.category || '') === category);
        });

        if (!filtered.length) {
            target.innerHTML = '<div class="ry-empty-state">No blog posts match your filters.</div>';
            return;
        }

        target.innerHTML = `
            <table class="ry-posts-table">
                <thead><tr><th>Post</th><th>Status</th><th>SEO</th><th>Updated</th><th>Actions</th></tr></thead>
                <tbody>
                    ${filtered.map((post) => {
                        const published = String(post.status).toLowerCase() === 'published';
                        const seoReady = isSeoReady(post);
                        const image = post.featured_image_url ? `<img src="${escapeAttr(post.featured_image_url)}" alt="" onerror="this.style.display='none'">` : '<div class="ry-post-thumb-placeholder">RY</div>';
                        return `
                            <tr>
                                <td>
                                    <div class="ry-post-title-cell">
                                        ${image}
                                        <div>
                                            <strong>${escapeHtml(post.title || 'Untitled')}</strong>
                                            <span>${escapeHtml(post.category || 'General')} · ${escapeHtml(post.slug || '')}</span>
                                        </div>
                                    </div>
                                </td>
                                <td><span class="ry-status-badge ${published ? 'published' : 'draft'}">${published ? 'Published' : 'Draft'}</span></td>
                                <td><span class="ry-seo-badge ${seoReady ? 'ready' : 'needs-work'}">${seoReady ? 'SEO Ready' : 'Needs SEO'}</span></td>
                                <td>${escapeHtml(formatDate(post.updated_at || post.created_at))}</td>
                                <td>
                                    <div class="ry-row-actions">
                                        <button type="button" class="ry-mini-btn" data-post-action="edit" data-post-id="${escapeAttr(post.id)}">Edit</button>
                                        <button type="button" class="ry-mini-btn" data-post-action="view" data-post-id="${escapeAttr(post.id)}">View</button>
                                        <button type="button" class="ry-mini-btn danger" data-post-action="delete" data-post-id="${escapeAttr(post.id)}">Delete</button>
                                    </div>
                                </td>
                            </tr>`;
                    }).join('')}
                </tbody>
            </table>`;
    }

    async function handlePostListClick(event) {
        const button = event.target.closest('[data-post-action]');
        if (!button) return;
        const post = posts.find((item) => String(item.id) === String(button.dataset.postId));
        if (!post) return;
        const action = button.dataset.postAction;

        if (action === 'edit') {
            loadPostIntoEditor(post);
            showWorkspacePage('blogPage', document.querySelector('[data-page="blogPage"]'));
            return;
        }
        if (action === 'view') {
            if (String(post.status).toLowerCase() === 'published') {
                window.open(`blog.html?slug=${encodeURIComponent(post.slug)}`, '_blank');
            } else {
                openPreview(post);
            }
            return;
        }
        if (action === 'delete') await deletePost(post);
    }

    async function deletePost(post) {
        if (!window.confirm(`Delete “${post.title}”?\n\nThis cannot be undone.`)) return;
        try {
            const { error } = await client.from('blog_posts').delete().eq('id', post.id);
            if (error) throw error;
            if (String(currentPostId) === String(post.id)) newPost();
            await loadPosts();
        } catch (error) {
            alert(error?.message || 'Unable to delete the post.');
        }
    }

    function updatePostMetrics() {
        setText('ryPostsTotal', posts.length);
        setText('ryPostsPublished', posts.filter((p) => String(p.status).toLowerCase() === 'published').length);
        setText('ryPostsDraft', posts.filter((p) => String(p.status).toLowerCase() !== 'published').length);
        setText('ryPostsSeoReady', posts.filter(isSeoReady).length);
    }

    function updateCategoryFilter() {
        const select = byId('ryPostsCategoryFilter');
        if (!select) return;
        const current = select.value || 'all';
        const categories = [...new Set(posts.map((p) => String(p.category || '').trim()).filter(Boolean))].sort();
        select.innerHTML = `<option value="all">All categories</option>${categories.map((category) => `<option value="${escapeAttr(category)}">${escapeHtml(category)}</option>`).join('')}`;
        select.value = categories.includes(current) ? current : 'all';
    }

    function updateAllPreviews() {
        updateCounters();
        updateSeoPreview();
        updateEditorPreview();
    }

    function updateCounters() {
        const excerpt = getValue('ryBlogExcerpt');
        const seoTitle = getValue('rySeoTitle');
        const seoDescription = getValue('rySeoDescription');
        const text = byId('ryBlogContentEditor')?.innerText || '';
        const words = countWords(text);
        const readTime = Math.max(1, Math.ceil(words / 225));
        setText('ryExcerptCount', `${excerpt.length} / 500`);
        setText('rySeoTitleCount', `${seoTitle.length} / 60`);
        setText('rySeoDescriptionCount', `${seoDescription.length} / 160`);
        setText('ryWordCount', `${words} words · ${readTime} min read`);
    }

    function updateSeoPreview() {
        const title = getValue('rySeoTitle').trim() || getValue('ryBlogTitle').trim() || 'Article title';
        const slug = slugify(getValue('ryBlogSlug') || getValue('ryBlogTitle'));
        const description = getValue('rySeoDescription').trim() || getValue('ryBlogExcerpt').trim() || 'Your meta description will appear here.';
        setText('ryGoogleTitle', title);
        setText('ryGoogleUrl', `https://renewyouhealthwellness.com/blog.html?slug=${slug}`);
        setText('ryGoogleDescription', description);

        const checks = [
            ['SEO title added', Boolean(getValue('rySeoTitle').trim())],
            ['Meta description added', Boolean(getValue('rySeoDescription').trim())],
            ['URL slug added', Boolean(slug)],
            ['Excerpt added', Boolean(getValue('ryBlogExcerpt').trim())],
            ['Featured image added', Boolean(getPreviewImageUrl())]
        ];
        const checklist = byId('rySeoChecklist');
        if (checklist) checklist.innerHTML = checks.map(([label, ok]) => `<div class="${ok ? 'ok' : ''}"><span>${ok ? '✓' : '○'}</span>${escapeHtml(label)}</div>`).join('');
    }

    function updateEditorPreview() {
        const target = byId('ryInlinePreview');
        if (!target) return;
        target.innerHTML = previewMarkup(getFormPost(), false);
    }

    function getFormPost() {
        const editor = byId('ryBlogContentEditor');
        return {
            title: getValue('ryBlogTitle').trim() || 'Your Blog Post Title',
            slug: slugify(getValue('ryBlogSlug') || getValue('ryBlogTitle')),
            category: getValue('ryBlogCategory').trim() || 'Health & Wellness',
            author: getValue('ryBlogAuthor').trim() || 'ReNew You Health & Wellness',
            excerpt: getValue('ryBlogExcerpt').trim(),
            content: sanitizeEditorHtml(editor?.innerHTML || ''),
            featured_image_url: getPreviewImageUrl(),
            seo_title: getValue('rySeoTitle').trim(),
            seo_description: getValue('rySeoDescription').trim(),
            status: getValue('ryBlogStatus') || 'draft',
            published_at: new Date().toISOString()
        };
    }

    function getPreviewImageUrl() {
        const image = byId('ryFeatureImagePreviewImg');
        return image?.getAttribute('src') || getValue('ryBlogImageUrl').trim();
    }

    function ensurePreviewModal() {
        if (byId('ryBlogPreviewModal')) return;
        const modal = document.createElement('div');
        modal.id = 'ryBlogPreviewModal';
        modal.className = 'ry-preview-modal';
        modal.hidden = true;
        modal.innerHTML = `
            <div class="ry-preview-modal-overlay" data-preview-close></div>
            <div class="ry-preview-modal-card" role="dialog" aria-modal="true" aria-label="Blog post preview">
                <div class="ry-preview-modal-head">
                    <strong>Blog Post Preview</strong>
                    <button type="button" class="ry-mini-btn" data-preview-close>Close</button>
                </div>
                <div id="ryFullPreviewTarget" class="ry-full-preview-target"></div>
            </div>`;
        document.body.appendChild(modal);
        modal.addEventListener('click', (event) => {
            if (event.target.closest('[data-preview-close]')) closePreview();
        });
    }

    function openPreview(post) {
        const modal = byId('ryBlogPreviewModal');
        const target = byId('ryFullPreviewTarget');
        if (!modal || !target) return;
        target.innerHTML = previewMarkup(post, true);
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function closePreview() {
        const modal = byId('ryBlogPreviewModal');
        if (modal) modal.hidden = true;
        document.body.style.overflow = '';
    }

    function previewMarkup(post, full) {
        const content = contentToEditorHtml(post?.content || '');
        const image = post?.featured_image_url || '';
        const excerpt = post?.excerpt || post?.summary || '';
        return `
            <article class="ry-preview-article ${full ? 'full' : ''}">
                <div class="ry-preview-category">${escapeHtml(post?.category || 'Health & Wellness')}</div>
                <h1>${escapeHtml(post?.title || 'Your Blog Post Title')}</h1>
                <div class="ry-preview-meta">By ${escapeHtml(post?.author || 'ReNew You Health & Wellness')} · ${escapeHtml(formatDate(post?.published_at || new Date().toISOString()))}</div>
                ${image ? `<img class="ry-preview-hero" src="${escapeAttr(image)}" alt="${escapeAttr(post?.title || 'Blog featured image')}" onerror="this.style.display='none'">` : ''}
                ${excerpt ? `<p class="ry-preview-excerpt">${escapeHtml(excerpt)}</p>` : ''}
                <div class="ry-preview-body">${content || '<p>Your article content will appear here.</p>'}</div>
            </article>`;
    }

    function contentToEditorHtml(content) {
        const source = String(content || '').trim();
        if (!source) return '';
        if (/<\/?[a-z][\s\S]*>/i.test(source)) return sanitizeEditorHtml(source);
        return source.split(/\n\s*\n/).map((paragraph) => `<p>${escapeHtml(paragraph.trim()).replace(/\n/g, '<br>')}</p>`).join('');
    }

    function sanitizeEditorHtml(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(`<div id="root">${String(html || '')}</div>`, 'text/html');
        const root = doc.getElementById('root');
        const allowedTags = new Set(['P','BR','STRONG','B','EM','I','U','H2','H3','H4','UL','OL','LI','BLOCKQUOTE','A','SPAN','FONT','DIV','HR']);
        const allowedStyles = new Set(['font-family','font-size','line-height','margin-bottom','text-align']);

        function clean(node) {
            Array.from(node.children || []).forEach((child) => {
                clean(child);
                if (!allowedTags.has(child.tagName)) {
                    child.replaceWith(...Array.from(child.childNodes));
                    return;
                }
                Array.from(child.attributes).forEach((attr) => {
                    const name = attr.name.toLowerCase();
                    const allowed = (child.tagName === 'A' && ['href','target','rel'].includes(name)) || (child.tagName === 'FONT' && ['face','size'].includes(name)) || name === 'style' || name === 'align';
                    if (!allowed) child.removeAttribute(attr.name);
                });
                if (child.hasAttribute('style')) {
                    const safeRules = [];
                    String(child.getAttribute('style') || '').split(';').forEach((rule) => {
                        const [rawProp, ...rest] = rule.split(':');
                        const prop = String(rawProp || '').trim().toLowerCase();
                        const value = rest.join(':').trim();
                        if (allowedStyles.has(prop) && value && !/url\s*\(/i.test(value) && !/expression\s*\(/i.test(value)) safeRules.push(`${prop}:${value}`);
                    });
                    if (safeRules.length) child.setAttribute('style', safeRules.join(';'));
                    else child.removeAttribute('style');
                }
                if (child.tagName === 'A') {
                    const href = String(child.getAttribute('href') || '').trim();
                    if (!/^(https?:|mailto:|tel:|\/|#)/i.test(href)) child.removeAttribute('href');
                    if (child.getAttribute('href')) {
                        child.setAttribute('target', '_blank');
                        child.setAttribute('rel', 'noopener noreferrer');
                    }
                }
            });
        }
        clean(root);
        return root.innerHTML.trim();
    }

    function isSeoReady(post) {
        return Boolean(String(post?.slug || '').trim() && String(post?.seo_title || '').trim() && String(post?.seo_description || '').trim() && String(post?.excerpt || post?.summary || '').trim());
    }

    function updatePostStatusAfterSelection() {
        const status = getValue('ryBlogStatus');
        setStatusBadge(status === 'published' ? 'Published' : 'Draft', status);
    }

    function setStatusBadge(text, status) {
        const badge = byId('ryEditingStatusBadge');
        if (!badge) return;
        badge.textContent = text;
        badge.className = `ry-status-badge ${String(status || 'draft').toLowerCase() === 'published' ? 'published' : 'draft'}`;
    }

    function showSaveMessage(message, type) {
        const box = byId('ryBlogSaveMessage');
        if (!box) return;
        box.hidden = false;
        box.textContent = message;
        box.className = `ry-save-message ${type || 'info'}`;
    }

    function hideSaveMessage() {
        const box = byId('ryBlogSaveMessage');
        if (box) box.hidden = true;
    }

    function setDisabled(disabled) {
        ['rySaveDraftBtn', 'ryPublishBtn'].forEach((id) => {
            const button = byId(id);
            if (button) button.disabled = disabled;
        });
    }

    function slugify(value) {
        return String(value || '').toLowerCase().trim().replace(/&/g, ' and ').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
    }

    function countWords(text) {
        const normalized = String(text || '').trim();
        return normalized ? normalized.split(/\s+/).filter(Boolean).length : 0;
    }

    function formatDate(value) {
        const date = new Date(value || Date.now());
        if (Number.isNaN(date.getTime())) return '';
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    function byId(id) { return document.getElementById(id); }
    function getValue(id) { return byId(id)?.value || ''; }
    function setValue(id, value) { const element = byId(id); if (element) element.value = value ?? ''; }
    function setText(id, value) { const element = byId(id); if (element) element.textContent = String(value ?? ''); }
    function escapeHtml(value) { return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
    function escapeAttr(value) { return escapeHtml(value); }

    function injectStyles() {
        if (document.getElementById('ryBlogEditorStyles')) return;
        const style = document.createElement('style');
        style.id = 'ryBlogEditorStyles';
        style.textContent = `
            .ry-blog-page-head{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;margin-bottom:22px;flex-wrap:wrap}.ry-blog-page-head h1{margin:4px 0 7px;color:#2d0d42;font-size:clamp(1.75rem,3vw,2.45rem);letter-spacing:-.035em}.ry-blog-page-head p{margin:0;color:#706b74}.ry-blog-kicker{display:block;color:#8a349b;font-weight:900;font-size:.68rem;letter-spacing:.15em}.ry-blog-head-actions{display:flex;gap:9px;flex-wrap:wrap}.ry-btn{border:0;border-radius:10px;padding:11px 15px;font:inherit;font-weight:800;cursor:pointer;transition:.2s}.ry-btn:disabled{opacity:.55;cursor:not-allowed}.ry-btn-primary{background:#3e0d5f;color:#fff}.ry-btn-primary:hover{background:#521178}.ry-btn-secondary{background:#efe6f3;color:#3e0d5f}.ry-btn-ghost{background:#fff;color:#3e0d5f;border:1px solid #ded4e4}.ry-btn-ghost:hover{background:#faf6fc}.ry-blog-editor-layout{display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:20px;align-items:start}.ry-blog-editor-main{min-width:0}.ry-blog-editor-side{min-width:0}.ry-blog-panel{background:#fff;border:1px solid #ede6ef;border-radius:16px;padding:22px;box-shadow:0 8px 26px rgba(42,14,56,.035);margin-bottom:20px}.ry-sticky-panel{position:sticky;top:20px}.ry-panel-title-row{display:flex;justify-content:space-between;align-items:flex-start;gap:15px;margin-bottom:17px}.ry-panel-title-row h2,.ry-blog-panel>h2{margin:4px 0 0;color:#351047;font-size:1.12rem}.ry-field{margin-bottom:17px}.ry-field:last-child{margin-bottom:0}.ry-field label{display:flex;justify-content:space-between;gap:8px;margin-bottom:7px;color:#3b3440;font-size:.74rem;font-weight:900;text-transform:uppercase;letter-spacing:.03em}.ry-field label span{font-weight:700;color:#8d8791;text-transform:none;letter-spacing:0}.ry-field input,.ry-field textarea,.ry-field select,.ry-posts-toolbar input,.ry-posts-toolbar select{width:100%;box-sizing:border-box;border:1px solid #ddd4e1;border-radius:10px;background:#fff;padding:11px 12px;font:inherit;color:#251d2a;outline:none}.ry-field input:focus,.ry-field textarea:focus,.ry-field select:focus,.ry-posts-toolbar input:focus,.ry-posts-toolbar select:focus{border-color:#8a349b;box-shadow:0 0 0 3px rgba(138,52,155,.09)}.ry-field small{display:block;color:#8b858e;font-size:.72rem;line-height:1.45;margin-top:6px}.ry-two-col{display:grid;grid-template-columns:1fr 1fr;gap:13px}.ry-slug-row{display:flex;align-items:center;border:1px solid #ddd4e1;border-radius:10px;overflow:hidden;background:#faf8fb}.ry-slug-row>span{padding-left:11px;color:#9a929f;font-size:.73rem;white-space:nowrap}.ry-slug-row input{border:0!important;border-radius:0;box-shadow:none!important;background:transparent}.ry-mini-btn{border:1px solid #ded4e4;background:#fff;color:#3e0d5f;border-radius:8px;padding:7px 10px;font-weight:800;cursor:pointer;white-space:nowrap}.ry-mini-btn:hover{background:#f8f3fa}.ry-mini-btn.danger{color:#b4233d;border-color:#f1ccd4;background:#fff8f9}.ry-image-controls{display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center}.ry-image-controls>span{color:#999;font-size:.75rem}.ry-feature-image-preview{position:relative;margin-top:11px;border-radius:12px;overflow:hidden;background:#f7f4f8;border:1px solid #eee5f1}.ry-feature-image-preview img{display:block;width:100%;height:230px;object-fit:cover}.ry-feature-image-preview button{position:absolute;right:10px;top:10px}.ry-rich-toolbar{display:flex;flex-wrap:wrap;gap:5px;padding:8px;border:1px solid #ddd4e1;border-bottom:0;border-radius:12px 12px 0 0;background:#f8f5f9;position:sticky;top:0;z-index:4}.ry-rich-toolbar button,.ry-rich-toolbar select{min-height:34px;border:1px solid #ddd4e1;background:#fff;border-radius:7px;color:#37233e;padding:6px 8px;font:inherit;font-size:.75rem;cursor:pointer}.ry-rich-toolbar button:hover,.ry-rich-toolbar select:hover{border-color:#a16aad}.ry-toolbar-divider{width:1px;background:#ddd4e1;margin:3px 2px}.ry-rich-editor{min-height:560px;border:1px solid #ddd4e1;border-radius:0 0 12px 12px;padding:28px;background:#fff;outline:none;color:#433b46;font-size:1rem;line-height:1.8;overflow-wrap:anywhere}.ry-rich-editor:focus{border-color:#8a349b;box-shadow:0 0 0 3px rgba(138,52,155,.08)}.ry-rich-editor:empty:before{content:attr(data-placeholder);color:#a19aa4;pointer-events:none}.ry-rich-editor h2{color:#3e0d5f;font-size:1.65rem;line-height:1.25;margin:32px 0 13px}.ry-rich-editor h3{color:#4c285e;font-size:1.28rem;line-height:1.3;margin:25px 0 10px}.ry-rich-editor p{margin:0 0 18px}.ry-rich-editor ul,.ry-rich-editor ol{padding-left:24px;margin:0 0 20px}.ry-rich-editor blockquote{margin:22px 0;padding:15px 20px;border-left:4px solid #8a349b;background:#faf6fb;color:#5f5263}.ry-publish-actions{display:grid;grid-template-columns:1fr 1fr;gap:9px}.ry-save-message{margin-top:12px;border-radius:9px;padding:10px 11px;font-size:.78rem;font-weight:750}.ry-save-message.success{background:#eff8ec;color:#3e7a2b}.ry-save-message.error{background:#fff0f2;color:#b4233d}.ry-save-message.info{background:#f5eff8;color:#633078}.ry-status-badge{display:inline-flex;align-items:center;border-radius:999px;padding:5px 9px;font-size:.67rem;font-weight:900;text-transform:uppercase;letter-spacing:.04em}.ry-status-badge.published{background:#edf8e8;color:#467f27}.ry-status-badge.draft{background:#f1eef3;color:#6f6873}.ry-seo-checklist{display:grid;gap:7px;margin:10px 0 18px}.ry-seo-checklist>div{display:flex;gap:8px;align-items:center;color:#8b858e;font-size:.78rem}.ry-seo-checklist>div.ok{color:#4b7d32}.ry-google-preview{border:1px solid #e2dbe5;border-radius:12px;padding:15px;background:#fff}.ry-google-label{font-size:.66rem;color:#999;text-transform:uppercase;font-weight:900;margin-bottom:10px}.ry-google-title{font-size:1.08rem;color:#1a0dab;margin-bottom:3px;line-height:1.25}.ry-google-url{color:#188038;font-size:.74rem;overflow-wrap:anywhere}.ry-google-description{color:#4d5156;font-size:.78rem;line-height:1.45;margin-top:5px}.ry-preview-panel{margin-top:0}.ry-article-preview{border:1px solid #eee7f0;border-radius:14px;background:#fdfcfe;padding:18px;max-height:700px;overflow:auto}.ry-preview-article{max-width:800px;margin:0 auto;background:#fff;border-radius:12px;padding:34px;box-sizing:border-box}.ry-preview-article.full{max-width:900px;padding:42px}.ry-preview-category{color:#8a349b;font-size:.7rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase}.ry-preview-article h1{color:#3e0d5f;font-size:clamp(1.8rem,4vw,2.7rem);line-height:1.12;margin:10px 0 10px;letter-spacing:-.035em}.ry-preview-meta{color:#8d8790;font-size:.8rem;margin-bottom:24px}.ry-preview-hero{display:block;width:100%;max-height:430px;object-fit:cover;border-radius:14px;margin:0 0 25px}.ry-preview-excerpt{font-size:1.08rem!important;line-height:1.75!important;font-weight:650;color:#5b5360!important;padding-bottom:22px;border-bottom:1px solid #eee;margin-bottom:25px!important}.ry-preview-body{color:#4f4952;font-size:1rem;line-height:1.85}.ry-preview-body p,.ry-preview-body div{margin:0 0 20px}.ry-preview-body h2{color:#3e0d5f;font-size:1.65rem;line-height:1.28;margin:34px 0 13px}.ry-preview-body h3{color:#4d2860;font-size:1.28rem;margin:26px 0 10px}.ry-preview-body ul,.ry-preview-body ol{padding-left:25px;margin:0 0 22px}.ry-preview-body li{margin-bottom:8px}.ry-preview-body blockquote{border-left:4px solid #8a349b;background:#faf6fb;padding:16px 20px;margin:24px 0;color:#5d5061}.ry-preview-body a{color:#7d248f;text-decoration:underline}.ry-blog-metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:18px}.ry-blog-metrics>div{background:#fff;border:1px solid #eee6f0;border-radius:13px;padding:16px}.ry-blog-metrics span{display:block;color:#89838b;font-size:.67rem;font-weight:900;text-transform:uppercase}.ry-blog-metrics strong{display:block;margin-top:4px;color:#3e0d5f;font-size:1.55rem}.ry-posts-toolbar{display:grid;grid-template-columns:minmax(220px,1fr) 180px 190px;gap:10px;margin-bottom:16px}.ry-posts-table-wrap{overflow-x:auto}.ry-posts-table{width:100%;border-collapse:collapse;min-width:820px}.ry-posts-table th{text-align:left;padding:10px 11px;color:#827b86;font-size:.68rem;text-transform:uppercase;border-bottom:1px solid #eee8f0}.ry-posts-table td{padding:13px 11px;border-bottom:1px solid #f0ebf2;vertical-align:middle}.ry-post-title-cell{display:flex;align-items:center;gap:12px;min-width:320px}.ry-post-title-cell img,.ry-post-thumb-placeholder{width:62px;height:48px;object-fit:cover;border-radius:8px;background:#f1eaf4;display:flex;align-items:center;justify-content:center;color:#7c478a;font-weight:900;flex:0 0 auto}.ry-post-title-cell strong{display:block;color:#331143;font-size:.87rem;line-height:1.25}.ry-post-title-cell span{display:block;color:#918a94;font-size:.72rem;margin-top:4px;max-width:360px;overflow:hidden;text-overflow:ellipsis}.ry-row-actions{display:flex;gap:6px}.ry-seo-badge{border-radius:999px;padding:5px 8px;font-size:.65rem;font-weight:900;white-space:nowrap}.ry-seo-badge.ready{background:#edf8e8;color:#467f27}.ry-seo-badge.needs-work{background:#fff4df;color:#916012}.ry-empty-state{text-align:center;padding:40px;color:#817a84}.ry-empty-state.error{color:#b4233d}.ry-preview-modal[hidden]{display:none}.ry-preview-modal{position:fixed;inset:0;z-index:10050;display:flex;align-items:center;justify-content:center;padding:24px}.ry-preview-modal-overlay{position:absolute;inset:0;background:rgba(28,11,35,.72);backdrop-filter:blur(3px)}.ry-preview-modal-card{position:relative;width:min(1050px,96vw);max-height:92vh;overflow:hidden;background:#f8f5f9;border-radius:18px;box-shadow:0 28px 80px rgba(0,0,0,.25);display:flex;flex-direction:column}.ry-preview-modal-head{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;background:#fff;border-bottom:1px solid #eae2ed}.ry-full-preview-target{overflow:auto;padding:25px}.ry-content-field{margin-bottom:0}
            @media(max-width:1120px){.ry-blog-editor-layout{grid-template-columns:1fr}.ry-sticky-panel{position:static}.ry-blog-editor-side{display:grid;grid-template-columns:1fr 1fr;gap:16px}.ry-blog-editor-side .ry-blog-panel{margin-bottom:0}.ry-posts-toolbar{grid-template-columns:1fr 160px 170px}}
            @media(max-width:760px){.ry-blog-panel{padding:16px}.ry-two-col,.ry-image-controls,.ry-publish-actions,.ry-blog-editor-side,.ry-posts-toolbar,.ry-blog-metrics{grid-template-columns:1fr}.ry-slug-row{display:block;padding-top:8px}.ry-slug-row>span{display:block;padding:0 10px 5px;white-space:normal}.ry-slug-row .ry-mini-btn{margin:0 10px 10px}.ry-rich-editor{padding:20px;min-height:430px}.ry-rich-toolbar{position:static}.ry-blog-metrics{grid-template-columns:1fr 1fr}.ry-preview-article,.ry-preview-article.full{padding:23px}.ry-full-preview-target{padding:12px}.ry-preview-modal{padding:10px}}
        `;
        document.head.appendChild(style);

    }
})();
