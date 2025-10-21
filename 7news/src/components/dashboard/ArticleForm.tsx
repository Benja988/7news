"use client";
import { useState, useEffect, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';

type Props = {
  initialData?: any;
};

export default function ArticleForm({ initialData }: Props) {
  const [form, setForm] = useState(
    initialData
      ? {
          ...initialData,
          tags: Array.isArray(initialData.tags)
            ? initialData.tags.join(", ")
            : initialData.tags || "",
          seo: initialData.seo || { metaTitle: "", metaDescription: "", keywords: [] },
          scheduledPublishAt: initialData.scheduledPublishAt
            ? new Date(initialData.scheduledPublishAt).toISOString().slice(0, 16)
            : "",
        }
      : {
          title: "",
          excerpt: "",
          content: "<p>Start writing your article content here...</p>",
          coverImage: "",
          category: "",
          tags: "",
          status: "draft",
          scheduledPublishAt: "",
          isFeatured: false,
          seo: { metaTitle: "", metaDescription: "", keywords: [] },
        }
  );

  const [categories, setCategories] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        const cats = Array.isArray(data) ? data : data.data || [];
        setCategories(cats);
      })
      .catch((err) => {
        console.error("Failed to fetch categories", err);
        setCategories([]);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setForm({ ...form, coverImage: data.url });
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleEditorChange = (content: string) => {
    setForm({ ...form, content });
  };

  const handleImageUpload = async (blobInfo: any, success: (url: string) => void, failure: (msg: string) => void) => {
    try {
      const formData = new FormData();
      formData.append('file', blobInfo.blob());

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      success(data.url);
    } catch (error) {
      console.error('Image upload error:', error);
      failure('Image upload failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tagsArray = Array.isArray(form.tags)
      ? form.tags
      : form.tags
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean);

    const keywordsArray = Array.isArray(form.seo.keywords)
      ? form.seo.keywords
      : form.seo.keywords
          .split(",")
          .map((k: string) => k.trim())
          .filter(Boolean);

    const submitData = {
      ...form,
      tags: tagsArray,
      seo: {
        ...form.seo,
        keywords: keywordsArray,
      },
      scheduledPublishAt: form.scheduledPublishAt ? new Date(form.scheduledPublishAt) : undefined,
    };

    const method = initialData ? "PUT" : "POST";
    const url = initialData
      ? `/api/articles/${initialData._id}`
      : "/api/articles";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitData),
    });

    window.location.href = "/admin/articles";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="input"
      />
      <textarea
        name="excerpt"
        value={form.excerpt}
        onChange={handleChange}
        placeholder="Excerpt"
        className="input"
      />
      <div className="space-y-2">
        <label className="block text-sm font-medium">Article Content</label>
        <Editor
          apiKey="no-api-key" // Using TinyMCE in free mode - no API key required for basic functionality
          value={form.content}
          onEditorChange={handleEditorChange}
          init={{
            height: 500,
            menubar: false,
            statusbar: false,
            branding: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
              'emoticons', 'paste', 'textcolor', 'colorpicker', 'hr', 'pagebreak',
              'codesample', 'blockquote', 'nonbreaking', 'contextmenu', 'directionality'
            ],
            toolbar: 'undo redo | formatselect | bold italic underline strikethrough | ' +
              'forecolor backcolor | alignleft aligncenter alignright alignjustify | ' +
              'bullist numlist outdent indent | table | image media link | ' +
              'code codesample blockquote hr | removeformat | fullscreen',
            content_style: 'body { font-family:Inter,Arial,sans-serif; font-size:14px; line-height:1.6; max-width: none; }',
            skin: 'oxide',
            content_css: false,
            images_upload_handler: handleImageUpload,
            automatic_uploads: true,
            file_picker_types: 'image',
            paste_data_images: true,
            paste_as_text: false,
            paste_webkit_styles: "all",
            paste_retain_style_properties: "all",
            paste_merge_formats: true,
            smart_paste: true,
            table_default_attributes: {
              border: '1',
              cellpadding: '8',
              cellspacing: '0',
              width: '100%',
              style: 'border-collapse: collapse; border: 1px solid #ddd;'
            },
            table_default_styles: {
              width: '100%',
              'border-collapse': 'collapse',
              border: '1px solid #ddd'
            },
            table_toolbar: 'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
            table_appearance_options: true,
            table_grid: true,
            table_cell_class_list: [
              {title: 'None', value: ''},
              {title: 'Header', value: 'table-header'},
              {title: 'Highlight', value: 'table-highlight'}
            ],
            fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt',
            formats: {
              alignleft: {selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', styles: {textAlign:'left'}},
              aligncenter: {selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', styles: {textAlign:'center'}},
              alignright: {selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', styles: {textAlign:'right'}},
              alignjustify: {selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', styles: {textAlign:'justify'}},
              bold: {inline: 'span', styles: {fontWeight: 'bold'}},
              italic: {inline: 'span', styles: {fontStyle: 'italic'}},
              underline: {inline: 'span', styles: {textDecoration: 'underline'}, exact: true},
              strikethrough: {inline: 'span', styles: {textDecoration: 'line-through'}, exact: true}
            },
            block_formats: 'Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3; Header 4=h4; Header 5=h5; Header 6=h6; Preformatted=pre; Code=code; Blockquote=blockquote',
            contextmenu: 'link image table configurepermanentpen',
            image_advtab: true,
            image_title: true,
            image_caption: true,
            image_class_list: [
              {title: 'None', value: ''},
              {title: 'Responsive', value: 'img-responsive'},
              {title: 'Rounded', value: 'img-rounded'},
              {title: 'Circle', value: 'img-circle'},
              {title: 'Thumbnail', value: 'img-thumbnail'}
            ],
            link_context_toolbar: true,
            link_assume_external_targets: true,
            link_default_target: '_blank',
            link_title: false,
            media_live_embeds: true,
            media_alt_source: false,
            media_poster: false,
            media_dimensions: false,
            codesample_languages: [
              {text: 'HTML/XML', value: 'markup'},
              {text: 'JavaScript', value: 'javascript'},
              {text: 'CSS', value: 'css'},
              {text: 'PHP', value: 'php'},
              {text: 'Ruby', value: 'ruby'},
              {text: 'Python', value: 'python'},
              {text: 'Java', value: 'java'},
              {text: 'C', value: 'c'},
              {text: 'C#', value: 'csharp'},
              {text: 'C++', value: 'cpp'}
            ],
            textpattern_patterns: [
              {start: '*', end: '*', format: 'italic'},
              {start: '**', end: '**', format: 'bold'},
              {start: '#', format: 'h1'},
              {start: '##', format: 'h2'},
              {start: '###', format: 'h3'},
              {start: '####', format: 'h4'},
              {start: '#####', format: 'h5'},
              {start: '######', format: 'h6'},
              {start: '1. ', cmd: 'InsertOrderedList'},
              {start: '* ', cmd: 'InsertUnorderedList'},
              {start: '- ', cmd: 'InsertUnorderedList'}
            ]
          }}
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="input"
          disabled={uploading}
        />
        {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
        {form.coverImage && (
          <div className="mt-2">
            <img src={form.coverImage} alt="Cover" className="w-32 h-32 object-cover rounded" />
          </div>
        )}
        <input
          name="coverImage"
          value={form.coverImage}
          onChange={handleChange}
          placeholder="Or enter Cover Image URL"
          className="input"
        />
      </div>
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="input"
      >
        <option value="">Select Category</option>
        {categories.map((c: any) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>
      <input
        name="tags"
        value={form.tags}
        onChange={handleChange}
        placeholder="Tags (comma separated)"
        className="input"
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="input"
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
        <option value="archived">Archived</option>
      </select>
      <input
        type="datetime-local"
        name="scheduledPublishAt"
        value={form.scheduledPublishAt}
        onChange={handleChange}
        className="input"
        placeholder="Schedule Publish Date"
      />
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isFeatured"
          name="isFeatured"
          checked={form.isFeatured}
          onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
        />
        <label htmlFor="isFeatured" className="text-sm">Featured Article</label>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">SEO Settings</label>
        <input
          name="seo.metaTitle"
          value={form.seo.metaTitle}
          onChange={(e) => setForm({
            ...form,
            seo: { ...form.seo, metaTitle: e.target.value }
          })}
          placeholder="Meta Title"
          className="input"
        />
        <textarea
          name="seo.metaDescription"
          value={form.seo.metaDescription}
          onChange={(e) => setForm({
            ...form,
            seo: { ...form.seo, metaDescription: e.target.value }
          })}
          placeholder="Meta Description"
          className="input"
          rows={2}
        />
        <input
          name="seo.keywords"
          value={Array.isArray(form.seo.keywords) ? form.seo.keywords.join(", ") : form.seo.keywords}
          onChange={(e) => setForm({
            ...form,
            seo: { ...form.seo, keywords: e.target.value }
          })}
          placeholder="Keywords (comma separated)"
          className="input"
        />
      </div>
      <button type="submit" className="btn-primary">
        {initialData ? "Update Article" : "Create Article"}
      </button>
    </form>
  );
}
