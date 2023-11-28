// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: 'exhibitions',
  type: 'document',
	title: 'Exhibitions',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required()
    },
    {
      title: 'URL Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200, // will be ignored if slugify is set
        slugify: input => input
                             .toLowerCase()
                             .replace(/\s+/g, '-')
                             .slice(0, 200)
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule => Rule.required()
    },
    {
      name: 'location',
      type: 'string',
      title: 'Location',
    },
    {
      name: 'date',
      type: 'string',
      title: 'Date',
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
      title: 'Exhibition Images',
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