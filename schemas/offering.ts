// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: 'offering',
  type: 'document',
	title: 'Offerings',
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
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        slugify: input => input
                             .toLowerCase()
                             .replace(/\s+/g, '-')
                             .slice(0, 200)
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'Examples',
      name: 'examples',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      type: 'array',
      name: 'images',
      title: 'Offering Images',
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
  ]
}