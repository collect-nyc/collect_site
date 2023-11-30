// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: 'featured',
  type: 'document',
	title: 'Featured Projects',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
    {
      type: 'array',
      name: 'images',
      title: 'Featured Images',
      of: [
        {
          type: 'image',
          name: 'image',
          title: 'Image',
          fields: [
            {
              type: 'string',
              name: 'alt',
              title: 'Alt Text',
            },
          ],
        }
      ]
    },
    {
      title: "Tags",
      name: "tags",
      type: "array",
      of: [{type: "string"}],
      options: {
        layout: "tags"
      }
    },
    {
      title: 'Link',
      name: 'href',
      type: 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel']
      })
    },
  ]
}