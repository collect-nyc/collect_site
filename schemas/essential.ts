// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: 'essential',
  type: 'document',
	title: 'Essential Text',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required()
    },
    {
      name: 'metadesc',
      type: 'string',
      title: 'Meta Description',
      validation: Rule => Rule.required()
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
      name: 'bodycopy',
      title: 'Body Copy',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      validation: Rule => Rule.required()
    },
  ]
}