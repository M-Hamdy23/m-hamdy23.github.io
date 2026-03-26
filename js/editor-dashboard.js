(() => {
    const PORTFOLIO_DATA_URL = 'data/portfolio-data.json';
    const MAX_HISTORY = 60;
    const SECTION_CONFIG = [
        {id: 'hero', key: 'HERO_DATA', label: 'Hero', icon: '⚡', description: 'Intro copy, calls to action, typewriter words, and hero stats.'},
        {id: 'skills', key: 'SKILLS_DATA', label: 'Skills', icon: '🧠', description: 'Skill categories, tags, and proficiency bars.'},
        {id: 'experience', key: 'EXPERIENCE_DATA', label: 'Experience', icon: '🧳', description: 'Career timeline entries, bullet points, and technologies.'},
        {id: 'education', key: 'EDUCATION_DATA', label: 'Education', icon: '🎓', description: 'Degrees, certifications, and supporting details.'},
        {id: 'contact', key: 'CONTACT_DATA', label: 'Contact', icon: '📬', description: 'Contact links, resume block, and outreach copy.'},
        {id: 'projects', key: 'PROJECTS', label: 'Projects', icon: '🧩', description: 'Project cards, media, videos, features, tech stack, and nested work breakdowns.'},
        {id: 'footer', key: 'FOOTER_DATA', label: 'Footer', icon: '🪪', description: 'Footer brand and location copy used on the site.'}
    ];

    function createTemplateItem(templateKey) {
        switch (templateKey) {
            case 'heroAction':
                return {text: 'New Action', href: '#projects', variant: 'primary', target: ''};
            case 'heroStat':
                return {value: '', suffix: '', label: 'New Stat'};
            case 'skillCategory':
                return {icon: '✨', name: 'New Category', tags: []};
            case 'skillBar':
                return {name: 'New Skill', pct: 70};
            case 'experience':
                return {company: 'New Company', role: 'Role', period: 'Date Range', bullets: [''], techs: []};
            case 'degree':
                return {id: Date.now(), icon: '🎓', degree: 'New Degree', school: 'School', period: 'Date Range', detail: ''};
            case 'certification':
                return {icon: '🏆', text: 'New Certification'};
            case 'contactLink':
                return {icon: '🔗', label: 'Label', value: '', href: '', target: '_blank'};
            case 'project':
                return {
                    id: `project-${Date.now()}`,
                    name: 'New Project',
                    icon: '🚀',
                    shortDesc: 'Short project summary.',
                    desc: 'Longer project description.',
                    tags: [],
                    platforms: [],
                    cover: '',
                    media: [],
                    videos: [],
                    features: [],
                    techs: [],
                    myWork: [],
                    link: [],
                    featured: false,
                    published: true
                };
            case 'projectMedia':
            case 'projectMyWorkMedia':
                return {src: '', alt: ''};
            case 'projectVideo':
                return {title: 'New Video', url: ''};
            case 'projectMyWork':
                return {title: 'My Contribution', description: '', media: []};
            case 'projectLink':
                return {text: 'Visit', url: '', type: 'website'};
            default:
                return null;
        }
    }

    const state = {
        data: createFallbackPortfolioData(),
        baseline: createFallbackPortfolioData(),
        activeSection: 'hero',
        selectedProjectIndex: 0,
        projectSearch: '',
        projectFilterTag: 'all',
        projectView: 'grid',
        showJsonPreview: false,
        currentFileName: 'portfolio-data.json',
        fileHandle: null,
        isDirty: false,
        history: [],
        historyIndex: -1,
        mediaPreviews: {},
        dragProjectIndex: null,
        validationIssues: [],
        lastSavedAt: null
    };

    const dom = {};
    let historyDebounce = null;
    let inspectorDebounce = null;

    function createFallbackPortfolioData() {
        return {
            HERO_DATA: {
                eyebrow: 'Senior Game Developer · Cairo, Egypt',
                name: {first: 'Mohamed', last: 'Hamdy'},
                typewriterPrefix: 'Expert in',
                typewriterWords: ['Unity3D', 'VR / XR', 'Multiplayer'],
                description: 'Edit your portfolio data from a friendlier dashboard.',
                actions: [
                    {text: 'View Projects →', href: '#projects', variant: 'primary', target: ''},
                    {text: 'Get In Touch', href: '#contact', variant: 'secondary', target: ''}
                ],
                stats: [
                    {value: '10', suffix: '+', label: 'Years Exp.'},
                    {value: '13', suffix: '+', label: 'Projects'}
                ]
            },
            SKILLS_DATA: {
                categories: [
                    {icon: '⚙️', name: 'Game Engines', tags: ['Unity3D', 'Unreal Engine']},
                    {icon: '🌐', name: 'Networking', tags: ['Multiplayer', 'Nakama', 'Photon']}
                ],
                bars: [
                    {name: 'Unity / C#', pct: 95},
                    {name: 'Game Architecture', pct: 90}
                ]
            },
            EXPERIENCE_DATA: [
                {
                    company: 'Example Studio',
                    role: 'Senior Game Developer',
                    period: '2024 — Present',
                    bullets: ['Led systems design for multiplayer and XR products.'],
                    techs: ['Unity', 'C#', 'XR']
                }
            ],
            EDUCATION_DATA: {
                degrees: [
                    {id: 1, icon: '🎓', degree: 'BSc Computer Science', school: 'University', period: '2013 — 2017', detail: 'Update this record in the dashboard.'}
                ],
                certifications: [
                    {icon: '🏆', text: 'Example Certification'}
                ]
            },
            CONTACT_DATA: {
                headline: 'Open to New',
                headlineEmphasis: 'Opportunities',
                description: 'Available for full-time and contract roles.',
                links: [
                    {icon: '✉️', label: 'Email', value: 'name@example.com', href: 'mailto:name@example.com', target: ''}
                ],
                resume: {
                    title: 'Download Resume',
                    description: 'Full work history, skills, and certificates in one document.',
                    buttonText: 'Download PDF ↓',
                    href: 'docs/resume.pdf'
                }
            },
            FOOTER_DATA: {
                brand: {name: 'MH', accent: '.dev', subtitle: 'Mohamed Hamdy'},
                copy: {year: String(new Date().getFullYear()), role: 'Game Developer', location: 'Cairo, Egypt'}
            },
            PROJECTS: [
                {
                    id: 'example-project',
                    name: 'Example Project',
                    icon: '🚀',
                    shortDesc: 'A project you can edit immediately after loading the dashboard.',
                    desc: 'Replace this with your real project description, media, technologies, and links.',
                    tags: ['unity', 'pc'],
                    platforms: ['PC'],
                    cover: '',
                    media: [],
                    videos: [],
                    features: ['Feature one'],
                    techs: ['Unity', 'C#'],
                    myWork: [],
                    link: [],
                    featured: true,
                    published: true
                }
            ]
        };
    }

    function deepClone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function escapeHtml(value) {
        return String(value ?? '').replace(/[&<>"']/g, char => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        })[char]);
    }

    function escapeAttribute(value) {
        return escapeHtml(value).replace(/`/g, '&#96;');
    }

    function pathToParts(path) {
        const parts = [];
        const regex = /([^.[\]]+)|\[(\d+)]/g;
        let match;
        while ((match = regex.exec(path)) !== null) {
            if (match[1] !== undefined) {
                parts.push(match[1]);
            } else {
                parts.push(Number(match[2]));
            }
        }
        return parts;
    }

    function getValueAtPath(root, path) {
        return pathToParts(path).reduce((acc, part) => (acc == null ? undefined : acc[part]), root);
    }

    function setValueAtPath(root, path, value) {
        const parts = pathToParts(path);
        let current = root;
        for (let index = 0; index < parts.length - 1; index += 1) {
            const part = parts[index];
            const nextPart = parts[index + 1];
            if (current[part] == null) {
                current[part] = typeof nextPart === 'number' ? [] : {};
            }
            current = current[part];
        }
        current[parts[parts.length - 1]] = value;
    }

    function ensureArrayAtPath(path) {
        const current = getValueAtPath(state.data, path);
        if (!Array.isArray(current)) {
            setValueAtPath(state.data, path, []);
        }
        return getValueAtPath(state.data, path);
    }

    function slugify(value) {
        return String(value || '')
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') || `project-${Date.now()}`;
    }

    function formatSectionCount(section) {
        const value = state.data[section.key];
        if (Array.isArray(value)) {
            return `${value.length} items`;
        }
        if (value && typeof value === 'object') {
            return `${Object.keys(value).length} groups`;
        }
        return '—';
    }

    function isExternalHttpUrl(value) {
        return /^https?:\/\//i.test(String(value || '').trim());
    }

    function isValidLinkValue(value) {
        const text = String(value || '').trim();
        if (!text) return false;
        if (/^(https?:\/\/|mailto:|tel:|#|\.\/|\.\.\/|\/)/i.test(text)) return true;
        return /^(?:[\w.-]+\/)+[\w.-]+(?:\.[a-z0-9]{2,5})?(?:[?#].*)?$/i.test(text) || /^[\w.-]+\.[a-z0-9]{2,5}(?:[?#].*)?$/i.test(text);
    }

    function isLikelyVideoFile(url) {
        return /blob:|\.mp4$|\.webm$|\.ogg$|\.mov$/i.test(String(url || '').trim());
    }

    function isEmbeddableVideo(url) {
        return /youtube\.com|youtu\.be|player\.vimeo\.com|iframe|embed/i.test(String(url || '').trim());
    }

    function summarizeText(value, max = 90) {
        const text = String(value || '').trim();
        if (text.length <= max) return text;
        return `${text.slice(0, max - 1).trim()}…`;
    }

    function clearMediaPreviewUrls() {
        Object.values(state.mediaPreviews).forEach(url => {
            if (String(url).startsWith('blob:')) {
                URL.revokeObjectURL(url);
            }
        });
        state.mediaPreviews = {};
    }

    function createSnapshot() {
        return {
            data: deepClone(state.data),
            selectedProjectIndex: state.selectedProjectIndex,
            projectSearch: state.projectSearch,
            projectFilterTag: state.projectFilterTag,
            activeSection: state.activeSection
        };
    }

    function applySnapshot(snapshot) {
        state.data = deepClone(snapshot.data);
        state.selectedProjectIndex = snapshot.selectedProjectIndex ?? 0;
        state.projectSearch = snapshot.projectSearch ?? '';
        state.projectFilterTag = snapshot.projectFilterTag ?? 'all';
        state.activeSection = snapshot.activeSection ?? state.activeSection;
        syncSelectionBounds();
        refreshValidation();
        refreshDirtyState();
        renderApp();
    }

    function pushHistory(reason = 'edit') {
        const snapshot = createSnapshot();
        const serialized = JSON.stringify(snapshot.data);
        const last = state.history[state.history.length - 1];
        if (last && JSON.stringify(last.data) === serialized) {
            state.history[state.history.length - 1] = snapshot;
            state.historyIndex = state.history.length - 1;
            return;
        }

        state.history = state.history.slice(0, state.historyIndex + 1);
        state.history.push(snapshot);
        if (state.history.length > MAX_HISTORY) {
            state.history.shift();
        }
        state.historyIndex = state.history.length - 1;
        updateShellState();
        if (reason) {
            scheduleInspectorRefresh();
        }
    }

    function scheduleHistoryPush(reason = 'edit') {
        window.clearTimeout(historyDebounce);
        historyDebounce = window.setTimeout(() => pushHistory(reason), 450);
    }

    function undoHistory() {
        if (state.historyIndex <= 0) return;
        state.historyIndex -= 1;
        applySnapshot(state.history[state.historyIndex]);
        notify('Undo applied.', 'info');
    }

    function redoHistory() {
        if (state.historyIndex >= state.history.length - 1) return;
        state.historyIndex += 1;
        applySnapshot(state.history[state.historyIndex]);
        notify('Redo applied.', 'info');
    }

    function scheduleInspectorRefresh() {
        window.clearTimeout(inspectorDebounce);
        inspectorDebounce = window.setTimeout(() => {
            refreshValidation();
            refreshDirtyState();
            renderInspector();
            updateShellState();
        }, 120);
    }

    function refreshDirtyState() {
        state.isDirty = JSON.stringify(state.data) !== JSON.stringify(state.baseline);
    }

    function syncSelectionBounds() {
        const totalProjects = Array.isArray(state.data.PROJECTS) ? state.data.PROJECTS.length : 0;
        if (totalProjects === 0) {
            state.selectedProjectIndex = -1;
            return;
        }
        state.selectedProjectIndex = Math.min(Math.max(state.selectedProjectIndex, 0), totalProjects - 1);
    }

    function refreshValidation() {
        state.validationIssues = validatePortfolio(state.data);
    }

    function currentSectionConfig() {
        return SECTION_CONFIG.find(section => section.id === state.activeSection) || SECTION_CONFIG[0];
    }

    function normalizeProjectIds() {
        const seen = new Set();
        ensureArrayAtPath('PROJECTS').forEach((project, index) => {
            let proposed = slugify(project.id || project.name || `project-${index + 1}`);
            while (seen.has(proposed)) {
                proposed = `${proposed}-${index + 1}`;
            }
            project.id = proposed;
            seen.add(proposed);
            if (Object.prototype.hasOwnProperty.call(project, 'order')) {
                project.order = index;
            }
        });
    }

    function notify(message, type = 'success', title) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<div class="toast-title">${escapeHtml(title || toastTitle(type))}</div><div class="toast-copy">${escapeHtml(message)}</div>`;
        dom.toastRegion.appendChild(toast);
        window.setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(8px)';
            window.setTimeout(() => toast.remove(), 220);
        }, 3200);
    }

    function toastTitle(type) {
        return ({success: 'Success', error: 'Something went wrong', warning: 'Check this', info: 'Heads up'})[type] || 'Notice';
    }

    function sectionTitleHtml(title, subtitle, actionsHtml = '') {
        return `
            <div class="card-header">
                <div>
                    <h3 class="card-title">${escapeHtml(title)}</h3>
                    <p class="card-subtitle">${escapeHtml(subtitle)}</p>
                </div>
                ${actionsHtml}
            </div>
        `;
    }

    function renderInputField({label, path, value = '', placeholder = '', help = '', type = 'text', required = false, fullWidth = false, step = '', min = '', max = ''}) {
        return `
            <label class="field ${fullWidth ? 'full-width' : ''}">
                <span class="field-label">${escapeHtml(label)}${required ? ' *' : ''}</span>
                ${help ? `<span class="field-help">${escapeHtml(help)}</span>` : ''}
                <input class="input" type="${escapeAttribute(type)}" data-path="${escapeAttribute(path)}" value="${escapeAttribute(value)}" placeholder="${escapeAttribute(placeholder)}" ${step !== '' ? `step="${escapeAttribute(step)}"` : ''} ${min !== '' ? `min="${escapeAttribute(min)}"` : ''} ${max !== '' ? `max="${escapeAttribute(max)}"` : ''}>
            </label>
        `;
    }

    function renderTextareaField({label, path, value = '', placeholder = '', help = '', fullWidth = true}) {
        return `
            <label class="field ${fullWidth ? 'full-width' : ''}">
                <span class="field-label">${escapeHtml(label)}</span>
                ${help ? `<span class="field-help">${escapeHtml(help)}</span>` : ''}
                <textarea class="textarea" data-path="${escapeAttribute(path)}" placeholder="${escapeAttribute(placeholder)}">${escapeHtml(value)}</textarea>
            </label>
        `;
    }

    function renderSelectField({label, path, value = '', options = [], help = '', fullWidth = false}) {
        return `
            <label class="field ${fullWidth ? 'full-width' : ''}">
                <span class="field-label">${escapeHtml(label)}</span>
                ${help ? `<span class="field-help">${escapeHtml(help)}</span>` : ''}
                <select class="select" data-path="${escapeAttribute(path)}">
                    ${options.map(option => {
                        const optionValue = typeof option === 'string' ? option : option.value;
                        const optionLabel = typeof option === 'string' ? option : option.label;
                        return `<option value="${escapeAttribute(optionValue)}" ${String(optionValue) === String(value) ? 'selected' : ''}>${escapeHtml(optionLabel)}</option>`;
                    }).join('')}
                </select>
            </label>
        `;
    }

    function renderCheckboxField({label, path, checked = false, help = ''}) {
        return `
            <div class="field full-width">
                <div class="checkbox-row">
                    <div>
                        <div class="field-label">${escapeHtml(label)}</div>
                        ${help ? `<div class="field-help">${escapeHtml(help)}</div>` : ''}
                    </div>
                    <input class="checkbox-control" type="checkbox" data-path="${escapeAttribute(path)}" ${checked ? 'checked' : ''}>
                </div>
            </div>
        `;
    }

    function renderRangeField({label, path, value = 0, min = 0, max = 100, help = ''}) {
        return `
            <div class="field full-width">
                <span class="field-label">${escapeHtml(label)}</span>
                ${help ? `<span class="field-help">${escapeHtml(help)}</span>` : ''}
                <div class="range-wrap">
                    <input class="range-input" type="range" min="${escapeAttribute(min)}" max="${escapeAttribute(max)}" data-path="${escapeAttribute(path)}" value="${escapeAttribute(value)}">
                    <div class="range-value" data-range-value-for="${escapeAttribute(path)}">${escapeHtml(value)}%</div>
                </div>
            </div>
        `;
    }

    function renderTagEditor({label, path, values = [], placeholder = 'Add tag and press Enter', help = ''}) {
        return `
            <div class="field full-width">
                <span class="field-label">${escapeHtml(label)}</span>
                ${help ? `<span class="field-help">${escapeHtml(help)}</span>` : ''}
                <div class="tag-editor">
                    <div class="tag-list">
                        ${(Array.isArray(values) ? values : []).map((value, index) => `
                            <span class="tag-chip">
                                ${escapeHtml(value)}
                                <button type="button" data-action="remove-tag" data-path="${escapeAttribute(path)}" data-index="${index}" aria-label="Remove ${escapeAttribute(value)}">✕</button>
                            </span>
                        `).join('') || '<span class="small-pill">No tags yet</span>'}
                    </div>
                    <div class="add-row">
                        <input class="input" type="text" data-tag-input="${escapeAttribute(path)}" placeholder="${escapeAttribute(placeholder)}">
                        <button class="btn-ghost" type="button" data-action="add-tag" data-path="${escapeAttribute(path)}">Add</button>
                    </div>
                </div>
            </div>
        `;
    }

    function renderStringListEditor({label, path, values = [], placeholder = 'Add item', multiline = false, help = '', addLabel = 'Add Item'}) {
        return `
            <div class="field full-width">
                <span class="field-label">${escapeHtml(label)}</span>
                ${help ? `<span class="field-help">${escapeHtml(help)}</span>` : ''}
                <div class="string-list">
                    ${(Array.isArray(values) ? values : []).map((value, index) => `
                        <div class="string-item">
                            ${multiline
                                ? `<textarea class="textarea" data-path="${escapeAttribute(`${path}[${index}]`)}" placeholder="${escapeAttribute(placeholder)}">${escapeHtml(value)}</textarea>`
                                : `<input class="input" type="text" data-path="${escapeAttribute(`${path}[${index}]`)}" value="${escapeAttribute(value)}" placeholder="${escapeAttribute(placeholder)}">`}
                            <div class="inline-actions">
                                <button class="btn-ghost btn-icon" type="button" data-action="move-array-item" data-path="${escapeAttribute(path)}" data-index="${index}" data-direction="up" aria-label="Move up">↑</button>
                                <button class="btn-ghost btn-icon" type="button" data-action="move-array-item" data-path="${escapeAttribute(path)}" data-index="${index}" data-direction="down" aria-label="Move down">↓</button>
                                <button class="btn-danger" type="button" data-action="remove-array-item" data-path="${escapeAttribute(path)}" data-index="${index}" data-label="${escapeAttribute(label)} item">Remove</button>
                            </div>
                        </div>
                    `).join('') || `<div class="empty-state"><strong>No entries yet</strong><div class="empty-copy">Use the button below to add the first item.</div></div>`}
                    <div class="add-row">
                        <input class="input" type="text" data-list-input="${escapeAttribute(path)}" placeholder="${escapeAttribute(placeholder)}">
                        <button class="btn-secondary" type="button" data-action="add-string-list-item" data-path="${escapeAttribute(path)}">${escapeHtml(addLabel)}</button>
                    </div>
                </div>
            </div>
        `;
    }

    function renderFilePathField({label, path, value = '', kind = 'image', accept = 'image/*', help = '', fullWidth = true}) {
        const preview = state.mediaPreviews[path] || value;
        return `
            <div class="field ${fullWidth ? 'full-width' : ''}">
                <span class="field-label">${escapeHtml(label)}</span>
                ${help ? `<span class="field-help">${escapeHtml(help)}</span>` : ''}
                <div class="path-stack">
                    <div class="media-preview">${renderMediaPreview(preview, label, kind)}</div>
                    <div class="upload-row">
                        <input class="path-input" type="text" data-path="${escapeAttribute(path)}" value="${escapeAttribute(value)}" placeholder="${kind === 'image' ? 'img/example.png' : 'https://www.youtube.com/embed/...'}">
                        <label class="file-label">Choose File
                            <input class="visually-hidden" type="file" accept="${escapeAttribute(accept)}" data-upload-target="${escapeAttribute(path)}" data-upload-kind="${escapeAttribute(kind)}">
                        </label>
                    </div>
                </div>
            </div>
        `;
    }

    function renderMediaPreview(value, label, kind = 'image') {
        const src = String(value || '').trim();
        if (!src) {
            return `<div class="media-placeholder"><strong>${escapeHtml(kind === 'image' ? 'No media selected' : 'No video source')}</strong><span>Add a path or choose a local file for preview.</span></div>`;
        }
        if (kind === 'image') {
            return `<img src="${escapeAttribute(src)}" alt="${escapeAttribute(label)} preview" loading="lazy">`;
        }
        if (isLikelyVideoFile(src)) {
            return `<video controls src="${escapeAttribute(src)}"></video>`;
        }
        if (isEmbeddableVideo(src) || isExternalHttpUrl(src)) {
            return `<iframe src="${escapeAttribute(src)}" title="${escapeAttribute(label)} preview" loading="lazy" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        }
        return `<div class="media-placeholder"><strong>Video path ready</strong><span>${escapeHtml(src)}</span></div>`;
    }

    function renderArrayItemActions(path, index, label, duplicateAction = true) {
        return `
            <div class="inline-actions">
                <button class="btn-ghost btn-icon" type="button" data-action="move-array-item" data-path="${escapeAttribute(path)}" data-index="${index}" data-direction="up" aria-label="Move up">↑</button>
                <button class="btn-ghost btn-icon" type="button" data-action="move-array-item" data-path="${escapeAttribute(path)}" data-index="${index}" data-direction="down" aria-label="Move down">↓</button>
                ${duplicateAction ? `<button class="btn-ghost" type="button" data-action="duplicate-array-item" data-path="${escapeAttribute(path)}" data-index="${index}" data-label="${escapeAttribute(label)}">Duplicate</button>` : ''}
                <button class="btn-danger" type="button" data-action="remove-array-item" data-path="${escapeAttribute(path)}" data-index="${index}" data-label="${escapeAttribute(label)}">Delete</button>
            </div>
        `;
    }

    function renderObjectArraySection({title, subtitle, path, items = [], templateKey, itemLabel, cardTitle, fields, addLabel = 'Add Item'}) {
        const safeItems = Array.isArray(items) ? items : [];
        return `
            <div class="editor-card">
                ${sectionTitleHtml(title, subtitle, `<button class="btn-primary" type="button" data-action="add-array-item" data-path="${escapeAttribute(path)}" data-template="${escapeAttribute(templateKey)}">${escapeHtml(addLabel)}</button>`)}
                ${safeItems.length
                    ? safeItems.map((item, index) => `
                        <details class="array-card" open>
                            <summary>
                                <div class="array-summary">
                                    <div>
                                        <div class="array-title">${escapeHtml(cardTitle(item, index))}</div>
                                        <div class="array-subtitle">${escapeHtml(itemLabel(index, item))}</div>
                                    </div>
                                    <span class="small-pill">Item ${index + 1}</span>
                                </div>
                            </summary>
                            <div class="array-body">
                                <div class="field-grid">
                                    ${fields.map(field => renderObjectField(`${path}[${index}]`, item, field)).join('')}
                                </div>
                                ${renderArrayItemActions(path, index, itemLabel(index, item))}
                            </div>
                        </details>
                    `).join('')
                    : `<div class="empty-state"><strong>No entries yet</strong><div class="empty-copy">Use the button above to add the first item.</div></div>`}
            </div>
        `;
    }

    function renderObjectField(basePath, item, field) {
        const fieldPath = `${basePath}.${field.key}`;
        const value = item?.[field.key];
        switch (field.type) {
            case 'textarea':
                return renderTextareaField({label: field.label, path: fieldPath, value, placeholder: field.placeholder || '', help: field.help || '', fullWidth: field.fullWidth !== false});
            case 'select':
                return renderSelectField({label: field.label, path: fieldPath, value, options: field.options || [], help: field.help || '', fullWidth: field.fullWidth || false});
            case 'checkbox':
                return renderCheckboxField({label: field.label, path: fieldPath, checked: Boolean(value), help: field.help || ''});
            case 'range':
                return renderRangeField({label: field.label, path: fieldPath, value: Number(value || 0), min: field.min ?? 0, max: field.max ?? 100, help: field.help || ''});
            case 'tags':
                return renderTagEditor({label: field.label, path: fieldPath, values: value, placeholder: field.placeholder, help: field.help || ''});
            case 'string-list':
                return renderStringListEditor({label: field.label, path: fieldPath, values: value, placeholder: field.placeholder || 'Add item', multiline: Boolean(field.multiline), help: field.help || '', addLabel: field.addLabel || 'Add Item'});
            case 'file-image':
                return renderFilePathField({label: field.label, path: fieldPath, value, kind: 'image', accept: 'image/*', help: field.help || '', fullWidth: field.fullWidth !== false});
            case 'file-video':
                return renderFilePathField({label: field.label, path: fieldPath, value, kind: 'video', accept: 'video/*', help: field.help || '', fullWidth: field.fullWidth !== false});
            default:
                return renderInputField({label: field.label, path: fieldPath, value, placeholder: field.placeholder || '', help: field.help || '', type: field.type || 'text', required: field.required, fullWidth: Boolean(field.fullWidth), step: field.step ?? '', min: field.min ?? '', max: field.max ?? ''});
        }
    }

    function renderHeroSection() {
        const hero = state.data.HERO_DATA || {};
        return `
            <div class="editor-layout">
                <div class="cards-grid">
                    <section class="editor-card">
                        ${sectionTitleHtml('Hero copy', 'Main headline, name, and intro content displayed above the fold.')}
                        <div class="field-grid">
                            ${renderInputField({label: 'Eyebrow', path: 'HERO_DATA.eyebrow', value: hero.eyebrow, placeholder: 'Senior Game Developer · Cairo, Egypt', fullWidth: true})}
                            ${renderInputField({label: 'First name', path: 'HERO_DATA.name.first', value: hero.name?.first, placeholder: 'Mohamed'})}
                            ${renderInputField({label: 'Last name', path: 'HERO_DATA.name.last', value: hero.name?.last, placeholder: 'Hamdy'})}
                            ${renderInputField({label: 'Typewriter prefix', path: 'HERO_DATA.typewriterPrefix', value: hero.typewriterPrefix, placeholder: 'Expert in'})}
                            ${renderTextareaField({label: 'Description', path: 'HERO_DATA.description', value: hero.description, placeholder: 'A short professional summary.'})}
                        </div>
                    </section>
                    <section class="editor-card">
                        ${sectionTitleHtml('Typewriter words', 'These rotate in the hero typewriter effect.')}
                        ${renderTagEditor({label: 'Words', path: 'HERO_DATA.typewriterWords', values: hero.typewriterWords, placeholder: 'Unity3D'})}
                    </section>
                </div>
                ${renderObjectArraySection({
                    title: 'Hero actions',
                    subtitle: 'Primary and secondary buttons shown in the hero section.',
                    path: 'HERO_DATA.actions',
                    items: hero.actions,
                    templateKey: 'heroAction',
                    itemLabel: index => `Action ${index + 1}`,
                    cardTitle: item => item?.text || 'Untitled action',
                    addLabel: 'Add Action',
                    fields: [
                        {key: 'text', label: 'Button text', required: true},
                        {key: 'href', label: 'Link / path', type: 'text', required: true, help: 'Supports anchors, relative paths, mailto, tel, or full URLs.'},
                        {key: 'variant', label: 'Variant', type: 'select', options: ['primary', 'secondary']},
                        {key: 'target', label: 'Target', type: 'select', options: [{value: '', label: 'Same Tab'}, {value: '_blank', label: 'New Tab'}]}
                    ]
                })}
                ${renderObjectArraySection({
                    title: 'Hero stats',
                    subtitle: 'Compact metrics displayed below the hero intro.',
                    path: 'HERO_DATA.stats',
                    items: hero.stats,
                    templateKey: 'heroStat',
                    itemLabel: index => `Stat ${index + 1}`,
                    cardTitle: item => item?.label || 'Untitled stat',
                    addLabel: 'Add Stat',
                    fields: [
                        {key: 'value', label: 'Value'},
                        {key: 'suffix', label: 'Suffix', placeholder: '+'},
                        {key: 'label', label: 'Label', required: true, fullWidth: true}
                    ]
                })}
            </div>
        `;
    }

    function renderSkillsSection() {
        const skills = state.data.SKILLS_DATA || {};
        return `
            <div class="editor-layout">
                ${renderObjectArraySection({
                    title: 'Skill categories',
                    subtitle: 'High-level skill buckets shown as cards on the site.',
                    path: 'SKILLS_DATA.categories',
                    items: skills.categories,
                    templateKey: 'skillCategory',
                    itemLabel: index => `Category ${index + 1}`,
                    cardTitle: item => item?.name || 'Untitled category',
                    addLabel: 'Add Category',
                    fields: [
                        {key: 'icon', label: 'Icon', help: 'Emoji or short text mark.'},
                        {key: 'name', label: 'Category name', required: true},
                        {key: 'tags', label: 'Tags', type: 'tags', placeholder: 'Unity DOTS', help: 'Press Enter or click Add for each tag.'}
                    ]
                })}
                ${renderObjectArraySection({
                    title: 'Skill bars',
                    subtitle: 'Animated proficiency bars shown lower in the section.',
                    path: 'SKILLS_DATA.bars',
                    items: skills.bars,
                    templateKey: 'skillBar',
                    itemLabel: index => `Bar ${index + 1}`,
                    cardTitle: item => item?.name || 'Untitled skill bar',
                    addLabel: 'Add Skill Bar',
                    fields: [
                        {key: 'name', label: 'Skill name', required: true},
                        {key: 'pct', label: 'Percentage', type: 'range', help: 'Choose a value between 0 and 100.'}
                    ]
                })}
            </div>
        `;
    }

    function renderExperienceSection() {
        const experience = Array.isArray(state.data.EXPERIENCE_DATA) ? state.data.EXPERIENCE_DATA : [];
        return renderObjectArraySection({
            title: 'Experience entries',
            subtitle: 'Each card represents one role on the public portfolio timeline.',
            path: 'EXPERIENCE_DATA',
            items: experience,
            templateKey: 'experience',
            itemLabel: index => `Experience ${index + 1}`,
            cardTitle: item => `${item?.company || 'Company'}${item?.role ? ` — ${item.role}` : ''}`,
            addLabel: 'Add Experience',
            fields: [
                {key: 'company', label: 'Company', required: true},
                {key: 'role', label: 'Role', required: true},
                {key: 'period', label: 'Period', required: true, fullWidth: true},
                {key: 'bullets', label: 'Bullet points', type: 'string-list', placeholder: 'Describe impact or responsibility', multiline: true, addLabel: 'Add Bullet'},
                {key: 'techs', label: 'Technologies', type: 'tags', placeholder: 'Unity'}
            ]
        });
    }

    function renderEducationSection() {
        const education = state.data.EDUCATION_DATA || {};
        return `
            <div class="editor-layout">
                ${renderObjectArraySection({
                    title: 'Degrees',
                    subtitle: 'Structured academic records and training programs.',
                    path: 'EDUCATION_DATA.degrees',
                    items: education.degrees,
                    templateKey: 'degree',
                    itemLabel: index => `Degree ${index + 1}`,
                    cardTitle: item => item?.degree || 'Untitled degree',
                    addLabel: 'Add Degree',
                    fields: [
                        {key: 'id', label: 'ID', type: 'number', min: 0, step: 1},
                        {key: 'icon', label: 'Icon'},
                        {key: 'degree', label: 'Degree', required: true},
                        {key: 'school', label: 'School', required: true},
                        {key: 'period', label: 'Period'},
                        {key: 'detail', label: 'Detail', type: 'textarea', fullWidth: true}
                    ]
                })}
                ${renderObjectArraySection({
                    title: 'Certifications',
                    subtitle: 'Short award and certification callouts.',
                    path: 'EDUCATION_DATA.certifications',
                    items: education.certifications,
                    templateKey: 'certification',
                    itemLabel: index => `Certification ${index + 1}`,
                    cardTitle: item => item?.text || 'Untitled certification',
                    addLabel: 'Add Certification',
                    fields: [
                        {key: 'icon', label: 'Icon'},
                        {key: 'text', label: 'Text', required: true, fullWidth: true}
                    ]
                })}
            </div>
        `;
    }

    function renderContactSection() {
        const contact = state.data.CONTACT_DATA || {};
        return `
            <div class="editor-layout">
                <div class="cards-grid">
                    <section class="editor-card">
                        ${sectionTitleHtml('Contact intro', 'Top copy used in the contact section.')}
                        <div class="field-grid">
                            ${renderInputField({label: 'Headline', path: 'CONTACT_DATA.headline', value: contact.headline, fullWidth: true})}
                            ${renderInputField({label: 'Headline emphasis', path: 'CONTACT_DATA.headlineEmphasis', value: contact.headlineEmphasis, fullWidth: true})}
                            ${renderTextareaField({label: 'Description', path: 'CONTACT_DATA.description', value: contact.description})}
                        </div>
                    </section>
                    <section class="editor-card">
                        ${sectionTitleHtml('Resume callout', 'Download card shown in the contact section.')}
                        <div class="field-grid">
                            ${renderInputField({label: 'Title', path: 'CONTACT_DATA.resume.title', value: contact.resume?.title})}
                            ${renderInputField({label: 'Button text', path: 'CONTACT_DATA.resume.buttonText', value: contact.resume?.buttonText})}
                            ${renderTextareaField({label: 'Description', path: 'CONTACT_DATA.resume.description', value: contact.resume?.description})}
                            ${renderInputField({label: 'Resume path / URL', path: 'CONTACT_DATA.resume.href', value: contact.resume?.href, help: 'Relative paths like docs/resume.pdf are supported.', fullWidth: true})}
                        </div>
                    </section>
                </div>
                ${renderObjectArraySection({
                    title: 'Contact links',
                    subtitle: 'Email, GitHub, LinkedIn, phone, and any additional channels.',
                    path: 'CONTACT_DATA.links',
                    items: contact.links,
                    templateKey: 'contactLink',
                    itemLabel: index => `Link ${index + 1}`,
                    cardTitle: item => item?.label || 'Untitled link',
                    addLabel: 'Add Link',
                    fields: [
                        {key: 'icon', label: 'Icon'},
                        {key: 'label', label: 'Label', required: true},
                        {key: 'value', label: 'Display value', fullWidth: true},
                        {key: 'href', label: 'Href', help: 'Supports https://, mailto:, tel:, anchors, and relative paths.', fullWidth: true},
                        {key: 'target', label: 'Target', type: 'select', options: [{value: '', label: 'Same Tab'}, {value: '_blank', label: 'New Tab'}]}
                    ]
                })}
            </div>
        `;
    }

    function renderFooterSection() {
        const footer = state.data.FOOTER_DATA || {};
        return `
            <div class="editor-layout">
                <div class="cards-grid">
                    <section class="editor-card">
                        ${sectionTitleHtml('Footer brand', 'Compact brand signature shown in the footer.')}
                        <div class="field-grid">
                            ${renderInputField({label: 'Name', path: 'FOOTER_DATA.brand.name', value: footer.brand?.name})}
                            ${renderInputField({label: 'Accent', path: 'FOOTER_DATA.brand.accent', value: footer.brand?.accent})}
                            ${renderInputField({label: 'Subtitle', path: 'FOOTER_DATA.brand.subtitle', value: footer.brand?.subtitle, fullWidth: true})}
                        </div>
                    </section>
                    <section class="editor-card">
                        ${sectionTitleHtml('Footer copy', 'Bottom line metadata displayed alongside the brand.')}
                        <div class="field-grid">
                            ${renderInputField({label: 'Year', path: 'FOOTER_DATA.copy.year', value: footer.copy?.year})}
                            ${renderInputField({label: 'Role', path: 'FOOTER_DATA.copy.role', value: footer.copy?.role})}
                            ${renderInputField({label: 'Location', path: 'FOOTER_DATA.copy.location', value: footer.copy?.location, fullWidth: true})}
                        </div>
                    </section>
                </div>
            </div>
        `;
    }

    function filteredProjectIndexes() {
        const projects = Array.isArray(state.data.PROJECTS) ? state.data.PROJECTS : [];
        return projects
            .map((project, index) => ({project, index}))
            .filter(({project}) => {
                const searchPass = !state.projectSearch || `${project.name} ${project.shortDesc || ''} ${(project.tags || []).join(' ')}`.toLowerCase().includes(state.projectSearch.toLowerCase());
                const filterPass = state.projectFilterTag === 'all' || (Array.isArray(project.tags) && project.tags.includes(state.projectFilterTag));
                return searchPass && filterPass;
            })
            .map(item => item.index);
    }

    function renderProjectListItem(project, index) {
        const preview = state.mediaPreviews[`PROJECTS[${index}].cover`] || project.cover;
        return `
            <article class="project-option ${index === state.selectedProjectIndex ? 'active' : ''}" draggable="true" data-project-index="${index}">
                <div class="project-option-head">
                    <div>
                        <h3 class="project-option-title">${escapeHtml(project.name || 'Untitled Project')}</h3>
                        <p class="project-option-desc">${escapeHtml(project.shortDesc || project.desc || 'Add a short project summary.')}</p>
                    </div>
                    <span class="small-pill">#${index + 1}</span>
                </div>
                <div class="project-thumb">${preview ? `<img src="${escapeAttribute(preview)}" alt="${escapeAttribute(project.name || 'Project')} cover" loading="lazy">` : escapeHtml(project.icon || '🧩')}</div>
                <div class="tag-list">${(project.tags || []).slice(0, 4).map(tag => `<span class="tag-chip">${escapeHtml(tag)}</span>`).join('') || '<span class="small-pill">No tags</span>'}</div>
                <div class="inline-actions">
                    <button class="btn-secondary" type="button" data-action="select-project" data-index="${index}">Edit</button>
                    <button class="btn-ghost" type="button" data-action="duplicate-project" data-index="${index}">Duplicate</button>
                    <button class="btn-danger" type="button" data-action="delete-project" data-index="${index}">Delete</button>
                </div>
            </article>
        `;
    }

    function renderProjectMediaArray(path, items, templateKey, title, subtitle) {
        const safeItems = Array.isArray(items) ? items : [];
        return `
            <section class="editor-card">
                ${sectionTitleHtml(title, subtitle, `<button class="btn-primary" type="button" data-action="add-array-item" data-path="${escapeAttribute(path)}" data-template="${escapeAttribute(templateKey)}">Add Item</button>`)}
                ${safeItems.length
                    ? `<div class="media-grid">${safeItems.map((item, index) => `
                        <article class="media-card">
                            <div class="media-preview">${renderMediaPreview(state.mediaPreviews[`${path}[${index}].src`] || item?.src, item?.alt || `${title} ${index + 1}`, 'image')}</div>
                            ${renderInputField({label: 'Source path', path: `${path}[${index}].src`, value: item?.src, placeholder: 'img/example.png', fullWidth: true})}
                            ${renderInputField({label: 'Alt text', path: `${path}[${index}].alt`, value: item?.alt, placeholder: 'Describe the screenshot', fullWidth: true})}
                            <label class="file-label">Upload image
                                <input class="visually-hidden" type="file" accept="image/*" data-upload-target="${escapeAttribute(`${path}[${index}].src`)}" data-upload-kind="image">
                            </label>
                            ${renderArrayItemActions(path, index, `${title} item`)}
                        </article>
                    `).join('')}</div>`
                    : `<div class="empty-state"><strong>No media yet</strong><div class="empty-copy">Add screenshots or artwork so the project modal has visual content.</div></div>`}
            </section>
        `;
    }

    function renderProjectVideos(path, items) {
        const safeItems = Array.isArray(items) ? items : [];
        return `
            <section class="editor-card">
                ${sectionTitleHtml('Videos', 'Supports YouTube/Vimeo embeds or local preview paths.', `<button class="btn-primary" type="button" data-action="add-array-item" data-path="${escapeAttribute(path)}" data-template="projectVideo">Add Video</button>`)}
                ${safeItems.length
                    ? `<div class="media-grid">${safeItems.map((item, index) => `
                        <article class="media-card">
                            <div class="media-preview">${renderMediaPreview(state.mediaPreviews[`${path}[${index}].url`] || item?.url, item?.title || `Video ${index + 1}`, 'video')}</div>
                            ${renderInputField({label: 'Title', path: `${path}[${index}].title`, value: item?.title, fullWidth: true})}
                            ${renderInputField({label: 'URL / path', path: `${path}[${index}].url`, value: item?.url, placeholder: 'https://www.youtube.com/embed/...', fullWidth: true})}
                            <label class="file-label">Upload local video
                                <input class="visually-hidden" type="file" accept="video/*" data-upload-target="${escapeAttribute(`${path}[${index}].url`)}" data-upload-kind="video">
                            </label>
                            ${renderArrayItemActions(path, index, `Video ${index + 1}`)}
                        </article>
                    `).join('')}</div>`
                    : `<div class="empty-state"><strong>No videos yet</strong><div class="empty-copy">Add trailers, gameplay clips, or embeddable showcase videos.</div></div>`}
            </section>
        `;
    }

    function renderProjectLinks(path, items) {
        const safeItems = Array.isArray(items) ? items : [];
        return `
            <section class="editor-card">
                ${sectionTitleHtml('Project links', 'Store pages, websites, downloadable demos, or case-study links.', `<button class="btn-primary" type="button" data-action="add-array-item" data-path="${escapeAttribute(path)}" data-template="projectLink">Add Link</button>`)}
                ${safeItems.length
                    ? safeItems.map((item, index) => `
                        <details class="array-card" open>
                            <summary>
                                <div class="array-summary">
                                    <div>
                                        <div class="array-title">${escapeHtml(item?.text || 'Untitled link')}</div>
                                        <div class="array-subtitle">${escapeHtml(item?.type || 'website')}</div>
                                    </div>
                                    <span class="small-pill">Link ${index + 1}</span>
                                </div>
                            </summary>
                            <div class="array-body">
                                <div class="field-grid">
                                    ${renderInputField({label: 'Text', path: `${path}[${index}].text`, value: item?.text})}
                                    ${renderInputField({label: 'Type', path: `${path}[${index}].type`, value: item?.type, placeholder: 'website'})}
                                    ${renderInputField({label: 'URL', path: `${path}[${index}].url`, value: item?.url, fullWidth: true})}
                                </div>
                                ${renderArrayItemActions(path, index, `Link ${index + 1}`)}
                            </div>
                        </details>
                    `).join('')
                    : `<div class="empty-state"><strong>No links yet</strong><div class="empty-copy">Add store, play, repository, or portfolio links here.</div></div>`}
            </section>
        `;
    }

    function renderMyWorkArray(path, items) {
        const safeItems = Array.isArray(items) ? items : [];
        return `
            <section class="editor-card">
                ${sectionTitleHtml('My work', 'Structured contribution breakdowns used inside the project modal.', `<button class="btn-primary" type="button" data-action="add-array-item" data-path="${escapeAttribute(path)}" data-template="projectMyWork">Add Contribution</button>`)}
                ${safeItems.length
                    ? safeItems.map((item, index) => `
                        <details class="array-card" open>
                            <summary>
                                <div class="array-summary">
                                    <div>
                                        <div class="array-title">${escapeHtml(item?.title || 'Untitled contribution')}</div>
                                        <div class="array-subtitle">${escapeHtml(summarizeText(item?.description || ''))}</div>
                                    </div>
                                    <span class="small-pill">Entry ${index + 1}</span>
                                </div>
                            </summary>
                            <div class="array-body">
                                <div class="field-grid">
                                    ${renderInputField({label: 'Title', path: `${path}[${index}].title`, value: item?.title, fullWidth: true})}
                                    ${renderTextareaField({label: 'Description', path: `${path}[${index}].description`, value: item?.description, placeholder: 'Describe your contribution in detail.'})}
                                </div>
                                ${renderProjectMediaArray(`${path}[${index}].media`, item?.media, 'projectMyWorkMedia', 'Contribution media', 'Images that support this specific contribution.')}
                                ${renderArrayItemActions(path, index, `Contribution ${index + 1}`)}
                            </div>
                        </details>
                    `).join('')
                    : `<div class="empty-state"><strong>No contributions yet</strong><div class="empty-copy">Break the project down into the parts you personally led or shipped.</div></div>`}
            </section>
        `;
    }

    function renderProjectsSection() {
        const projects = Array.isArray(state.data.PROJECTS) ? state.data.PROJECTS : [];
        syncSelectionBounds();
        const project = projects[state.selectedProjectIndex];
        const visibleIndexes = filteredProjectIndexes();
        const allTags = Array.from(new Set(projects.flatMap(item => Array.isArray(item.tags) ? item.tags : []))).sort();

        return `
            <div class="project-shell">
                <aside class="project-library-card">
                    <div class="card-header">
                        <div>
                            <h3 class="card-title">Project Library</h3>
                            <p class="card-subtitle">Search, filter, duplicate, delete, and drag to reorder.</p>
                        </div>
                        <button class="btn-primary" type="button" data-action="add-project">Add Project</button>
                    </div>
                    <div class="project-toolbar">
                        <input class="input" id="project-search" type="search" value="${escapeAttribute(state.projectSearch)}" placeholder="Search by name, tag, or summary">
                    </div>
                    <div class="project-filter-row">
                        <button class="filter-pill ${state.projectFilterTag === 'all' ? 'active' : ''}" type="button" data-action="set-project-filter" data-tag="all">All</button>
                        ${allTags.map(tag => `<button class="filter-pill ${state.projectFilterTag === tag ? 'active' : ''}" type="button" data-action="set-project-filter" data-tag="${escapeAttribute(tag)}">${escapeHtml(tag)}</button>`).join('')}
                    </div>
                    <div class="section-stats">
                        <span class="meta-pill">${projects.length} total</span>
                        <span class="meta-pill">${visibleIndexes.length} visible</span>
                        <span class="meta-pill">Drag & Drop enabled</span>
                    </div>
                    <div class="project-list">
                        ${visibleIndexes.length ? visibleIndexes.map(index => renderProjectListItem(projects[index], index)).join('') : `<div class="empty-state"><strong>No matching projects</strong><div class="empty-copy">Try clearing the search or filter, or create a new project.</div></div>`}
                    </div>
                </aside>
                <section class="project-editor-panel">
                    ${project ? renderProjectEditor(project, state.selectedProjectIndex) : `<div class="empty-state"><strong>No project selected</strong><div class="empty-copy">Create a project to begin editing.</div></div>`}
                </section>
            </div>
        `;
    }

    function renderProjectEditor(project, index) {
        return `
            <section class="editor-card">
                ${sectionTitleHtml('Selected project', 'Edit metadata, screenshots, links, and nested contribution stories.', `<div class="section-actions"><button class="btn-ghost" type="button" data-action="duplicate-project" data-index="${index}">Duplicate</button><button class="btn-danger" type="button" data-action="delete-project" data-index="${index}">Delete</button></div>`)}
                <div class="project-summary-hero">
                    <div class="hero-preview">${renderMediaPreview(state.mediaPreviews[`PROJECTS[${index}].cover`] || project.cover, project.name || 'Project cover', 'image')}</div>
                    <div class="project-headline">
                        <span class="section-kicker">Project ${index + 1}</span>
                        <h2>${escapeHtml(project.name || 'Untitled Project')}</h2>
                        <p>${escapeHtml(project.shortDesc || project.desc || 'Add a summary to help the public project card stand out.')}</p>
                        <div class="tag-list">
                            ${(project.platforms || []).map(platform => `<span class="tag-chip">${escapeHtml(platform)}</span>`).join('') || '<span class="small-pill">No platforms</span>'}
                        </div>
                    </div>
                </div>
            </section>
            <section class="editor-card">
                ${sectionTitleHtml('Basic information', 'Public card copy, tags, platform badges, and publish controls.')}
                <div class="field-grid">
                    ${renderInputField({label: 'ID', path: `PROJECTS[${index}].id`, value: project.id, help: 'Keep IDs unique. If blank, a slug will be generated on save.'})}
                    ${renderInputField({label: 'Icon', path: `PROJECTS[${index}].icon`, value: project.icon, placeholder: '🕹️'})}
                    ${renderInputField({label: 'Name', path: `PROJECTS[${index}].name`, value: project.name, required: true, fullWidth: true})}
                    ${renderTextareaField({label: 'Short description', path: `PROJECTS[${index}].shortDesc`, value: project.shortDesc, placeholder: 'Used on project cards and headers.'})}
                    ${renderTextareaField({label: 'Full description', path: `PROJECTS[${index}].desc`, value: project.desc, placeholder: 'Full project story used inside the modal.'})}
                    ${renderTagEditor({label: 'Tags', path: `PROJECTS[${index}].tags`, values: project.tags, placeholder: 'unity', help: 'Keep tags lowercase if they are used by the public project filters.'})}
                    ${renderTagEditor({label: 'Platforms', path: `PROJECTS[${index}].platforms`, values: project.platforms, placeholder: 'PC'})}
                    ${renderTagEditor({label: 'Tech stack', path: `PROJECTS[${index}].techs`, values: project.techs, placeholder: 'C#'})}
                    ${renderStringListEditor({label: 'Features', path: `PROJECTS[${index}].features`, values: project.features, placeholder: 'Add feature', multiline: false, addLabel: 'Add Feature'})}
                    ${renderFilePathField({label: 'Cover image', path: `PROJECTS[${index}].cover`, value: project.cover, kind: 'image', accept: 'image/*', help: 'Choosing a file previews it locally and suggests a relative path. Move the file into your repo before publishing.'})}
                    ${renderCheckboxField({label: 'Featured', path: `PROJECTS[${index}].featured`, checked: Boolean(project.featured), help: 'Useful for highlighting special projects in future templates.'})}
                    ${renderCheckboxField({label: 'Published', path: `PROJECTS[${index}].published`, checked: project.published !== false, help: 'Use this flag to track draft vs published status in the editor.'})}
                    ${renderInputField({label: 'Manual order', path: `PROJECTS[${index}].order`, value: project.order ?? '', type: 'number', min: 0, step: 1, help: 'Optional. Array order is what matters most.'})}
                </div>
            </section>
            ${renderProjectMediaArray(`PROJECTS[${index}].media`, project.media, 'projectMedia', 'Media gallery', 'Image gallery used in the shared project modal.')}
            ${renderProjectVideos(`PROJECTS[${index}].videos`, project.videos)}
            ${renderMyWorkArray(`PROJECTS[${index}].myWork`, project.myWork)}
            ${renderProjectLinks(`PROJECTS[${index}].link`, project.link)}
            <section class="note-card">
                <strong class="note-title">Media upload note</strong>
                <div class="note-copy">Because this dashboard runs as a static web app, selecting a local file updates the preview and suggests a relative path in JSON. To make the portfolio site show that asset publicly, place the file in your repo (for example under <code>img/</code>) and keep the saved path accurate.</div>
            </section>
        `;
    }

    function renderSectionContent() {
        switch (state.activeSection) {
            case 'hero': return renderHeroSection();
            case 'skills': return renderSkillsSection();
            case 'experience': return renderExperienceSection();
            case 'education': return renderEducationSection();
            case 'contact': return renderContactSection();
            case 'projects': return renderProjectsSection();
            case 'footer': return renderFooterSection();
            default: return renderHeroSection();
        }
    }

    function renderNav() {
        dom.sectionNav.innerHTML = SECTION_CONFIG.map(section => `
            <button class="nav-button ${state.activeSection === section.id ? 'active' : ''}" type="button" data-action="navigate-section" data-section="${section.id}">
                <span class="nav-icon">${section.icon}</span>
                <span class="nav-text">
                    <strong>${section.label}</strong><br>
                    <span class="muted-copy">${escapeHtml(section.description)}</span>
                </span>
                <span class="nav-badge">${escapeHtml(formatSectionCount(section))}</span>
            </button>
        `).join('');
    }

    function renderTopbar() {
        const section = currentSectionConfig();
        const warningCount = state.validationIssues.length;
        dom.sectionTitle.textContent = section.label;
        dom.sectionDescription.textContent = section.description;
        dom.statusBadges.innerHTML = `
            <span class="status-pill ${state.isDirty ? 'dirty' : ''}">${state.isDirty ? 'Unsaved changes' : 'All changes saved in browser state'}</span>
            <span class="status-pill ${warningCount ? 'warning' : ''}">${warningCount ? `${warningCount} validation notice${warningCount === 1 ? '' : 's'}` : 'Validation looks good'}</span>
            <span class="status-pill">${escapeHtml(state.currentFileName)}</span>
        `;
        dom.undoButton.disabled = state.historyIndex <= 0;
        dom.redoButton.disabled = state.historyIndex >= state.history.length - 1;
        dom.previewToggle.classList.toggle('active', state.showJsonPreview);
        dom.previewToggle.textContent = state.showJsonPreview ? 'Hide JSON Preview' : 'Show JSON Preview';
    }

    function renderInspector() {
        const issues = state.validationIssues;
        const projects = Array.isArray(state.data.PROJECTS) ? state.data.PROJECTS.length : 0;
        const experiences = Array.isArray(state.data.EXPERIENCE_DATA) ? state.data.EXPERIENCE_DATA.length : 0;
        dom.inspector.innerHTML = `
            <div class="inspector-stack">
                <section class="inspector-card">
                    <div class="card-header">
                        <div>
                            <h3 class="card-title">Workspace status</h3>
                            <p class="card-subtitle">A quick health check before you export or save.</p>
                        </div>
                        <span class="preview-badge ${state.isDirty ? 'active' : ''}">${state.isDirty ? 'Dirty' : 'Clean'}</span>
                    </div>
                    <div class="metric-grid">
                        <div class="metric-card"><div class="metric-value">${projects}</div><div class="metric-label">Projects</div></div>
                        <div class="metric-card"><div class="metric-value">${experiences}</div><div class="metric-label">Experience Cards</div></div>
                        <div class="metric-card"><div class="metric-value">${issues.length}</div><div class="metric-label">Validation Notices</div></div>
                        <div class="metric-card"><div class="metric-value">${state.lastSavedAt ? escapeHtml(state.lastSavedAt) : '—'}</div><div class="metric-label">Last Save</div></div>
                    </div>
                </section>
                <section class="inspector-card validation-summary">
                    <div>
                        <h3 class="card-title">Validation</h3>
                        <p class="card-subtitle">Required fields, duplicate IDs, URLs, and value ranges are checked automatically.</p>
                    </div>
                    ${issues.length
                        ? `<div class="validation-list">${issues.slice(0, 12).map(issue => `
                            <article class="validation-item">
                                <span class="validation-pill ${issue.severity}">${escapeHtml(issue.severity)}</span>
                                <strong>${escapeHtml(issue.message)}</strong>
                                <div class="validation-path">${escapeHtml(issue.path)}</div>
                            </article>
                        `).join('')}${issues.length > 12 ? `<div class="helper-text">Showing 12 of ${issues.length} notices.</div>` : ''}</div>`
                        : `<div class="empty-state"><strong>No validation notices</strong><div class="empty-copy">Everything important required by the current schema is present.</div></div>`}
                </section>
                <section class="inspector-card">
                    <div class="card-header">
                        <div>
                            <h3 class="card-title">Workflow tips</h3>
                            <p class="card-subtitle">Optimized for non-technical editing.</p>
                        </div>
                    </div>
                    <div class="note-copy">• Use the sidebar to move between sections.</div>
                    <div class="note-copy">• Drag project cards in the library to reorder them.</div>
                    <div class="note-copy">• Press <span class="kbd">Ctrl</span> + <span class="kbd">Z</span> / <span class="kbd">Y</span> for undo and redo.</div>
                    <div class="note-copy">• Local uploads preview instantly, but saved JSON still stores a file path you can edit.</div>
                </section>
                ${state.showJsonPreview ? `
                    <section class="preview-card">
                        <div class="preview-toolbar">
                            <div>
                                <h3>JSON Preview</h3>
                                <div class="preview-meta">Formatted export preview for the current state.</div>
                            </div>
                        </div>
                        <pre>${escapeHtml(JSON.stringify(cleanDataForExport(state.data), null, 2))}</pre>
                    </section>
                ` : ''}
            </div>
        `;
    }

    function renderApp() {
        renderNav();
        renderTopbar();
        dom.sectionContent.innerHTML = renderSectionContent();
        renderInspector();
        updateShellState();
    }

    function updateShellState() {
        dom.fileName.textContent = state.currentFileName;
        dom.fileState.textContent = state.isDirty ? 'Unsaved local edits' : 'No pending local edits';
        dom.fileState.className = `status-pill ${state.isDirty ? 'dirty' : ''}`;
        dom.lastSave.textContent = state.lastSavedAt ? `Last save: ${state.lastSavedAt}` : 'No file saved in this session';
    }

    function setFieldValueFromElement(element) {
        const path = element.dataset.path;
        if (!path) return;
        let nextValue;
        if (element.type === 'checkbox') {
            nextValue = element.checked;
        } else if (element.type === 'number' || element.type === 'range') {
            nextValue = element.value === '' ? '' : Number(element.value);
        } else {
            nextValue = element.value;
        }
        setValueAtPath(state.data, path, nextValue);
        if (path === 'PROJECTS[' + state.selectedProjectIndex + '].name' && !getValueAtPath(state.data, `PROJECTS[${state.selectedProjectIndex}].id`)) {
            setValueAtPath(state.data, `PROJECTS[${state.selectedProjectIndex}].id`, slugify(nextValue));
        }
        refreshDirtyState();
        scheduleHistoryPush('field change');
        scheduleInspectorRefresh();
        if (element.type === 'range') {
            const badge = document.querySelector(`[data-range-value-for="${CSS.escape(path)}"]`);
            if (badge) badge.textContent = `${element.value}%`;
        }
    }

    function addTag(path, value) {
        const clean = String(value || '').trim();
        if (!clean) return;
        const tags = ensureArrayAtPath(path);
        if (!tags.includes(clean)) {
            tags.push(clean);
            afterStateMutation('Tag added.');
        }
    }

    function addStringListItem(path, value = '') {
        const list = ensureArrayAtPath(path);
        list.push(String(value || '').trim());
        afterStateMutation('List item added.');
    }

    function appendTemplateItem(path, templateKey) {
        const list = ensureArrayAtPath(path);
        const item = createTemplateItem(templateKey);
        if (!item) return;
        list.push(item);
        if (path === 'PROJECTS') {
            state.selectedProjectIndex = list.length - 1;
            normalizeProjectIds();
        }
        afterStateMutation('Item added.');
    }

    function duplicateArrayItem(path, index, label) {
        const list = ensureArrayAtPath(path);
        if (!list[index]) return;
        list.splice(index + 1, 0, deepClone(list[index]));
        if (path === 'PROJECTS') {
            state.selectedProjectIndex = index + 1;
            list[index + 1].id = slugify(`${list[index + 1].id || list[index + 1].name || 'project'} copy`);
            normalizeProjectIds();
        }
        afterStateMutation(`${label || 'Item'} duplicated.`);
    }

    function moveArrayItem(path, index, direction) {
        const list = ensureArrayAtPath(path);
        const offset = direction === 'up' ? -1 : 1;
        const targetIndex = index + offset;
        if (targetIndex < 0 || targetIndex >= list.length) return;
        const [item] = list.splice(index, 1);
        list.splice(targetIndex, 0, item);
        if (path === 'PROJECTS') {
            state.selectedProjectIndex = targetIndex;
            normalizeProjectIds();
        }
        afterStateMutation('Item reordered.');
    }

    function removeArrayItem(path, index, label) {
        const list = ensureArrayAtPath(path);
        if (!list[index]) return;
        if (!window.confirm(`Delete ${label || 'this item'}?`)) return;
        list.splice(index, 1);
        if (path === 'PROJECTS') {
            state.selectedProjectIndex = Math.max(0, Math.min(state.selectedProjectIndex, list.length - 1));
            normalizeProjectIds();
        }
        afterStateMutation('Item deleted.', 'warning');
    }

    function removeTag(path, index) {
        const tags = ensureArrayAtPath(path);
        tags.splice(index, 1);
        afterStateMutation('Tag removed.', 'warning');
    }

    function afterStateMutation(message, type = 'success') {
        syncSelectionBounds();
        refreshValidation();
        refreshDirtyState();
        pushHistory('mutation');
        renderApp();
        if (message) notify(message, type);
    }

    function getSuggestedAssetPath(file, currentValue, kind) {
        const current = String(currentValue || '').trim();
        if (current && !current.startsWith('blob:') && current.includes('/')) {
            const slashIndex = current.lastIndexOf('/');
            return `${current.slice(0, slashIndex + 1)}${file.name}`;
        }
        return `${kind === 'video' ? 'media' : 'img'}/${file.name}`;
    }

    async function handleUploadSelection(input) {
        const file = input.files?.[0];
        const path = input.dataset.uploadTarget;
        const kind = input.dataset.uploadKind || 'image';
        if (!file || !path) return;
        const previous = state.mediaPreviews[path];
        if (previous && previous.startsWith('blob:')) {
            URL.revokeObjectURL(previous);
        }
        state.mediaPreviews[path] = URL.createObjectURL(file);
        const currentValue = getValueAtPath(state.data, path);
        const suggestedPath = getSuggestedAssetPath(file, currentValue, kind);
        setValueAtPath(state.data, path, suggestedPath);
        afterStateMutation('Local preview updated. Remember to move the file into your repo before publishing.', 'info');
    }

    async function loadDefaultData() {
        try {
            const response = await fetch(PORTFOLIO_DATA_URL, {cache: 'no-store'});
            if (!response.ok) {
                throw new Error(`Failed to fetch ${PORTFOLIO_DATA_URL}: ${response.status}`);
            }
            const payload = await response.json();
            hydrateWithData(payload, 'portfolio-data.json', null, false);
            notify('Default portfolio JSON loaded.', 'success');
        } catch (error) {
            console.error(error);
            hydrateWithData(createFallbackPortfolioData(), 'fallback-example.json', null, false);
            notify('Could not fetch the default JSON. A built-in example has been loaded instead.', 'warning');
        }
    }

    function hydrateWithData(payload, fileName, fileHandle = null, pushInitialHistory = true) {
        clearMediaPreviewUrls();
        state.data = deepClone(payload || createFallbackPortfolioData());
        state.baseline = deepClone(payload || createFallbackPortfolioData());
        state.fileHandle = fileHandle;
        state.currentFileName = fileName || 'portfolio-data.json';
        state.selectedProjectIndex = 0;
        state.projectSearch = '';
        state.projectFilterTag = 'all';
        normalizeProjectIds();
        refreshValidation();
        refreshDirtyState();
        state.history = [];
        state.historyIndex = -1;
        if (pushInitialHistory) {
            pushHistory('initial');
        } else {
            pushHistory('loaded');
        }
        renderApp();
    }

    async function importJsonFromPicker() {
        try {
            if (window.showOpenFilePicker) {
                const [handle] = await window.showOpenFilePicker({
                    multiple: false,
                    types: [{description: 'JSON files', accept: {'application/json': ['.json']}}]
                });
                const file = await handle.getFile();
                const text = await file.text();
                const payload = JSON.parse(text);
                hydrateWithData(payload, file.name, handle);
                notify('JSON file imported.', 'success');
                return;
            }
        } catch (error) {
            if (error?.name !== 'AbortError') {
                console.error(error);
                notify('Could not open the file picker. Use the browser fallback instead.', 'warning');
            }
        }
        dom.importInput.click();
    }

    async function handleImportInputChange(event) {
        const file = event.target.files?.[0];
        if (!file) return;
        try {
            const text = await file.text();
            const payload = JSON.parse(text);
            hydrateWithData(payload, file.name, null);
            notify('JSON file imported.', 'success');
        } catch (error) {
            console.error(error);
            notify('The selected file is not valid JSON.', 'error');
        } finally {
            event.target.value = '';
        }
    }

    function cleanDataForExport(data) {
        const cloned = deepClone(data);
        normalizeProjectIdsInClone(cloned);
        return cloned;
    }

    function normalizeProjectIdsInClone(cloned) {
        if (!Array.isArray(cloned.PROJECTS)) return;
        const seen = new Set();
        cloned.PROJECTS.forEach((project, index) => {
            let candidate = slugify(project.id || project.name || `project-${index + 1}`);
            while (seen.has(candidate)) {
                candidate = `${candidate}-${index + 1}`;
            }
            project.id = candidate;
            seen.add(candidate);
            if (Object.prototype.hasOwnProperty.call(project, 'order')) {
                project.order = index;
            }
        });
    }

    function exportPortfolioJson() {
        const exportData = cleanDataForExport(state.data);
        const blob = new Blob([JSON.stringify(exportData, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = state.currentFileName || 'portfolio-data.json';
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
    }

    async function savePortfolioJson() {
        const exportData = cleanDataForExport(state.data);
        const text = JSON.stringify(exportData, null, 2);
        try {
            if (state.fileHandle?.createWritable) {
                const writable = await state.fileHandle.createWritable();
                await writable.write(text);
                await writable.close();
                state.baseline = deepClone(exportData);
                state.lastSavedAt = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
                refreshDirtyState();
                pushHistory('save');
                renderApp();
                notify('Saved directly to the opened JSON file.', 'success');
                return;
            }
            if (window.showSaveFilePicker) {
                const handle = await window.showSaveFilePicker({
                    suggestedName: state.currentFileName || 'portfolio-data.json',
                    types: [{description: 'JSON files', accept: {'application/json': ['.json']}}]
                });
                const writable = await handle.createWritable();
                await writable.write(text);
                await writable.close();
                state.fileHandle = handle;
                state.currentFileName = handle.name || state.currentFileName;
                state.baseline = deepClone(exportData);
                state.lastSavedAt = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
                refreshDirtyState();
                pushHistory('save');
                renderApp();
                notify('Saved to a JSON file.', 'success');
                return;
            }
        } catch (error) {
            if (error?.name !== 'AbortError') {
                console.error(error);
                notify('Direct save failed. Exporting a download instead.', 'warning');
            }
        }
        exportPortfolioJson();
        state.baseline = deepClone(exportData);
        state.lastSavedAt = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        refreshDirtyState();
        pushHistory('save');
        renderApp();
        notify('Downloaded the updated JSON file.', 'success');
    }

    function resetChanges() {
        if (!state.isDirty) {
            notify('There are no unsaved changes to reset.', 'info');
            return;
        }
        if (!window.confirm('Discard all unsaved changes and restore the last loaded JSON?')) return;
        clearMediaPreviewUrls();
        state.data = deepClone(state.baseline);
        syncSelectionBounds();
        refreshValidation();
        refreshDirtyState();
        pushHistory('reset');
        renderApp();
        notify('Changes were reset to the last loaded version.', 'warning');
    }

    function handleActionClick(button) {
        const action = button.dataset.action;
        switch (action) {
            case 'navigate-section':
                state.activeSection = button.dataset.section;
                renderApp();
                return;
            case 'toggle-theme':
                toggleTheme();
                return;
            case 'add-array-item':
                appendTemplateItem(button.dataset.path, button.dataset.template);
                return;
            case 'duplicate-array-item':
                duplicateArrayItem(button.dataset.path, Number(button.dataset.index), button.dataset.label);
                return;
            case 'move-array-item':
                moveArrayItem(button.dataset.path, Number(button.dataset.index), button.dataset.direction);
                return;
            case 'remove-array-item':
                removeArrayItem(button.dataset.path, Number(button.dataset.index), button.dataset.label);
                return;
            case 'remove-tag':
                removeTag(button.dataset.path, Number(button.dataset.index));
                return;
            case 'add-tag': {
                const input = document.querySelector(`[data-tag-input="${CSS.escape(button.dataset.path)}"]`);
                addTag(button.dataset.path, input?.value || '');
                if (input) input.value = '';
                return;
            }
            case 'add-string-list-item': {
                const input = document.querySelector(`[data-list-input="${CSS.escape(button.dataset.path)}"]`);
                addStringListItem(button.dataset.path, input?.value || '');
                if (input) input.value = '';
                return;
            }
            case 'select-project':
                state.selectedProjectIndex = Number(button.dataset.index);
                renderApp();
                return;
            case 'add-project':
                appendTemplateItem('PROJECTS', 'project');
                return;
            case 'duplicate-project':
                duplicateArrayItem('PROJECTS', Number(button.dataset.index), 'Project');
                return;
            case 'delete-project':
                removeArrayItem('PROJECTS', Number(button.dataset.index), 'project');
                return;
            case 'set-project-filter':
                state.projectFilterTag = button.dataset.tag || 'all';
                renderApp();
                return;
            case 'load-default':
                loadDefaultData();
                return;
            case 'import-json':
                importJsonFromPicker();
                return;
            case 'save-json':
                savePortfolioJson();
                return;
            case 'export-json':
                exportPortfolioJson();
                notify('JSON export downloaded.', 'success');
                return;
            case 'reset-data':
                resetChanges();
                return;
            case 'undo':
                undoHistory();
                return;
            case 'redo':
                redoHistory();
                return;
            case 'toggle-preview':
                state.showJsonPreview = !state.showJsonPreview;
                renderInspector();
                renderTopbar();
                return;
            default:
        }
    }

    function handleDocumentClick(event) {
        const button = event.target.closest('[data-action]');
        if (!button) return;
        handleActionClick(button);
    }

    function handleDocumentInput(event) {
        const target = event.target;
        if (target.matches('[data-path]')) {
            setFieldValueFromElement(target);
            return;
        }
        if (target.id === 'project-search') {
            state.projectSearch = target.value;
            renderApp();
        }
    }

    function handleDocumentChange(event) {
        const target = event.target;
        if (target.matches('[data-upload-target]')) {
            handleUploadSelection(target);
        }
        if (target === dom.importInput) {
            handleImportInputChange(event);
        }
    }

    function handleDocumentKeydown(event) {
        const isUndo = (event.ctrlKey || event.metaKey) && !event.shiftKey && event.key.toLowerCase() === 'z';
        const isRedo = ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'y') || ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'z');
        if (isUndo) {
            event.preventDefault();
            undoHistory();
            return;
        }
        if (isRedo) {
            event.preventDefault();
            redoHistory();
            return;
        }

        const tagInput = event.target.closest('[data-tag-input]');
        if (tagInput && event.key === 'Enter') {
            event.preventDefault();
            addTag(tagInput.dataset.tagInput, tagInput.value);
            tagInput.value = '';
            return;
        }

        const listInput = event.target.closest('[data-list-input]');
        if (listInput && event.key === 'Enter') {
            event.preventDefault();
            addStringListItem(listInput.dataset.listInput, listInput.value);
            listInput.value = '';
        }
    }

    function handleProjectDragStart(event) {
        const card = event.target.closest('[data-project-index]');
        if (!card) return;
        state.dragProjectIndex = Number(card.dataset.projectIndex);
        card.classList.add('dragging');
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', String(state.dragProjectIndex));
    }

    function handleProjectDragOver(event) {
        const card = event.target.closest('[data-project-index]');
        if (!card) return;
        event.preventDefault();
        card.classList.add('project-drop-target');
    }

    function handleProjectDragLeave(event) {
        const card = event.target.closest('[data-project-index]');
        if (card) card.classList.remove('project-drop-target');
    }

    function handleProjectDrop(event) {
        const card = event.target.closest('[data-project-index]');
        if (!card) return;
        event.preventDefault();
        card.classList.remove('project-drop-target');
        const targetIndex = Number(card.dataset.projectIndex);
        const sourceIndex = state.dragProjectIndex;
        if (Number.isInteger(sourceIndex) && sourceIndex !== targetIndex) {
            const list = ensureArrayAtPath('PROJECTS');
            const [item] = list.splice(sourceIndex, 1);
            list.splice(targetIndex, 0, item);
            state.selectedProjectIndex = targetIndex;
            normalizeProjectIds();
            afterStateMutation('Projects reordered.');
        }
        state.dragProjectIndex = null;
    }

    function handleProjectDragEnd(event) {
        const card = event.target.closest('[data-project-index]');
        if (card) card.classList.remove('dragging');
        document.querySelectorAll('.project-drop-target').forEach(node => node.classList.remove('project-drop-target'));
        state.dragProjectIndex = null;
    }

    function validatePortfolio(data) {
        const issues = [];
        const pushIssue = (severity, path, message) => issues.push({severity, path, message});
        const requireText = (value, path, label) => {
            if (!String(value || '').trim()) {
                pushIssue('error', path, `${label} is required.`);
            }
        };
        const validateLink = (value, path, label) => {
            if (value && !isValidLinkValue(value)) {
                pushIssue('warning', path, `${label} does not look like a valid URL or relative path.`);
            }
        };

        requireText(data?.HERO_DATA?.name?.first, 'HERO_DATA.name.first', 'Hero first name');
        requireText(data?.HERO_DATA?.name?.last, 'HERO_DATA.name.last', 'Hero last name');
        requireText(data?.HERO_DATA?.description, 'HERO_DATA.description', 'Hero description');

        (data?.HERO_DATA?.actions || []).forEach((action, index) => {
            requireText(action?.text, `HERO_DATA.actions[${index}].text`, 'Hero action text');
            requireText(action?.href, `HERO_DATA.actions[${index}].href`, 'Hero action href');
            validateLink(action?.href, `HERO_DATA.actions[${index}].href`, 'Hero action href');
        });

        (data?.SKILLS_DATA?.bars || []).forEach((bar, index) => {
            const pct = Number(bar?.pct);
            if (!Number.isFinite(pct) || pct < 0 || pct > 100) {
                pushIssue('warning', `SKILLS_DATA.bars[${index}].pct`, 'Skill percentage should be between 0 and 100.');
            }
            requireText(bar?.name, `SKILLS_DATA.bars[${index}].name`, 'Skill bar name');
        });

        (data?.EXPERIENCE_DATA || []).forEach((item, index) => {
            requireText(item?.company, `EXPERIENCE_DATA[${index}].company`, 'Company');
            requireText(item?.role, `EXPERIENCE_DATA[${index}].role`, 'Role');
            requireText(item?.period, `EXPERIENCE_DATA[${index}].period`, 'Period');
            if (!Array.isArray(item?.bullets) || item.bullets.length === 0) {
                pushIssue('warning', `EXPERIENCE_DATA[${index}].bullets`, 'Add at least one bullet point for this experience entry.');
            }
        });

        const degreeIds = new Set();
        (data?.EDUCATION_DATA?.degrees || []).forEach((degree, index) => {
            requireText(degree?.degree, `EDUCATION_DATA.degrees[${index}].degree`, 'Degree');
            requireText(degree?.school, `EDUCATION_DATA.degrees[${index}].school`, 'School');
            if (degree?.id !== undefined && degree?.id !== null && degree?.id !== '') {
                if (degreeIds.has(String(degree.id))) {
                    pushIssue('warning', `EDUCATION_DATA.degrees[${index}].id`, 'Degree IDs should be unique.');
                }
                degreeIds.add(String(degree.id));
            }
        });

        (data?.CONTACT_DATA?.links || []).forEach((link, index) => {
            requireText(link?.label, `CONTACT_DATA.links[${index}].label`, 'Contact link label');
            validateLink(link?.href, `CONTACT_DATA.links[${index}].href`, 'Contact link href');
        });
        validateLink(data?.CONTACT_DATA?.resume?.href, 'CONTACT_DATA.resume.href', 'Resume href');

        const projectIds = new Set();
        (data?.PROJECTS || []).forEach((project, index) => {
            requireText(project?.id, `PROJECTS[${index}].id`, 'Project ID');
            requireText(project?.name, `PROJECTS[${index}].name`, 'Project name');
            requireText(project?.desc, `PROJECTS[${index}].desc`, 'Project description');
            if (project?.id) {
                if (projectIds.has(project.id)) {
                    pushIssue('error', `PROJECTS[${index}].id`, 'Project IDs must be unique.');
                }
                projectIds.add(project.id);
            }
            if (!Array.isArray(project?.tags) || project.tags.length === 0) {
                pushIssue('warning', `PROJECTS[${index}].tags`, 'Projects should usually have at least one tag for filtering.');
            }
            if (!Array.isArray(project?.platforms) || project.platforms.length === 0) {
                pushIssue('warning', `PROJECTS[${index}].platforms`, 'Projects should usually list at least one platform badge.');
            }
            validateLink(project?.cover, `PROJECTS[${index}].cover`, 'Project cover');
            (project?.media || []).forEach((entry, mediaIndex) => {
                requireText(entry?.src, `PROJECTS[${index}].media[${mediaIndex}].src`, 'Media source');
                validateLink(entry?.src, `PROJECTS[${index}].media[${mediaIndex}].src`, 'Media source');
            });
            (project?.videos || []).forEach((video, videoIndex) => {
                requireText(video?.url, `PROJECTS[${index}].videos[${videoIndex}].url`, 'Video URL');
                validateLink(video?.url, `PROJECTS[${index}].videos[${videoIndex}].url`, 'Video URL');
            });
            (project?.link || []).forEach((entry, linkIndex) => {
                requireText(entry?.url, `PROJECTS[${index}].link[${linkIndex}].url`, 'Project link URL');
                validateLink(entry?.url, `PROJECTS[${index}].link[${linkIndex}].url`, 'Project link URL');
            });
            (project?.myWork || []).forEach((entry, workIndex) => {
                requireText(entry?.title, `PROJECTS[${index}].myWork[${workIndex}].title`, 'Contribution title');
                requireText(entry?.description, `PROJECTS[${index}].myWork[${workIndex}].description`, 'Contribution description');
                (entry?.media || []).forEach((media, nestedIndex) => {
                    requireText(media?.src, `PROJECTS[${index}].myWork[${workIndex}].media[${nestedIndex}].src`, 'Contribution media source');
                    validateLink(media?.src, `PROJECTS[${index}].myWork[${workIndex}].media[${nestedIndex}].src`, 'Contribution media source');
                });
            });
        });

        return issues;
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-admin-theme', theme);
        const lit = theme === 'light';
        dom.themeTrack.classList.toggle('lit', lit);
        dom.themeLabel.textContent = lit ? 'Light mode' : 'Dark mode';
    }

    function toggleTheme() {
        const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        applyTheme(next);
    }

    function bindDomReferences() {
        dom.sectionNav = document.getElementById('section-nav');
        dom.sectionTitle = document.getElementById('current-section-title');
        dom.sectionDescription = document.getElementById('current-section-description');
        dom.sectionContent = document.getElementById('section-content');
        dom.inspector = document.getElementById('inspector-panel');
        dom.statusBadges = document.getElementById('status-badges');
        dom.importInput = document.getElementById('json-import-input');
        dom.toastRegion = document.getElementById('toast-region');
        dom.themeTrack = document.getElementById('theme-track');
        dom.themeLabel = document.getElementById('theme-label');
        dom.fileName = document.getElementById('sidebar-file-name');
        dom.fileState = document.getElementById('sidebar-file-state');
        dom.lastSave = document.getElementById('sidebar-last-save');
        dom.undoButton = document.getElementById('undo-button');
        dom.redoButton = document.getElementById('redo-button');
        dom.previewToggle = document.getElementById('preview-toggle');
    }

    function attachEventListeners() {
        document.addEventListener('click', handleDocumentClick);
        document.addEventListener('input', handleDocumentInput);
        document.addEventListener('change', handleDocumentChange);
        document.addEventListener('keydown', handleDocumentKeydown);
        document.addEventListener('dragstart', handleProjectDragStart);
        document.addEventListener('dragover', handleProjectDragOver);
        document.addEventListener('dragleave', handleProjectDragLeave);
        document.addEventListener('drop', handleProjectDrop);
        document.addEventListener('dragend', handleProjectDragEnd);
    }

    async function init() {
        bindDomReferences();
        attachEventListeners();
        applyTheme(localStorage.getItem('portfolio-admin-theme') || document.documentElement.getAttribute('data-theme') || 'dark');
        refreshValidation();
        refreshDirtyState();
        pushHistory('bootstrap');
        renderApp();
        await loadDefaultData();
    }

    window.addEventListener('beforeunload', event => {
        if (!state.isDirty) return;
        event.preventDefault();
        event.returnValue = '';
    });

    window.addEventListener('DOMContentLoaded', init);
})();


