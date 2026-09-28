# Content management

The microsite uses [Pages CMS](https://app.pagescms.org/) as a lightweight editor for the
Markdown collections already used by Astro. The published website remains a fully static GitHub
Pages site: Pages CMS only creates commits in the repository.

## First-time setup

1. Open <https://app.pagescms.org/> and sign in with GitHub.
2. Install the Pages CMS GitHub App for the organisation or account that owns this repository.
3. Give the app access to this repository and open it in Pages CMS.
4. Select the branch that GitHub Pages deploys from.

Pages CMS reads `.pages.yml` from the repository root. No CMS server, database, secret or extra
deployment is required.

## Add a document

1. Open **Project content → Documents** and choose **New document**.
2. Fill in the title, category, state and display order.
3. Upload the file in **Uploaded file**, or paste an external URL in **External link**.
4. Save the entry. The commit triggers the normal GitHub Pages workflow.

Uploaded files are stored in `public/documents/`; their public URL is written into the content
entry automatically. To remove a document from the index, delete its entry. Delete the uploaded
file from **Document files** too when it is no longer used anywhere else.

## Other editable content

The same panel can create and update meeting minutes, milestones and team profiles. Milestones
cannot be deleted from the panel accidentally, but their dates, status, deliverables,
presentations and reports can be edited.

To embed a Canva presentation in a milestone, add the following to its frontmatter using
Canva's public embed URL:

```yaml
canvaPresentation:
  title: "MS1 presentation"
  embedUrl: "https://www.canva.com/design/DESIGN_ID/VIEW_ID/view?embed"
```
