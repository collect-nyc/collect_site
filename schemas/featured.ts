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
      title: 'Small Height',
      name: 'small',
      type: 'boolean',
      initialValue: false,
    },
    {
      type: 'array',
      name: 'images',
      title: 'Featured Media',
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
        },
        {
          name: 'video',
          title: 'Video',
          type: 'file',
          options: {
            accept: 'video/*',
            sources: [
              { name: 'video', title: 'Video', icon: () => '🎥' }, // Customize the icon if needed
            ],
          },
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
      name: 'hrefText',
      type: 'string',
      title: 'Link Text'
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