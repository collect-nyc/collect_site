// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: 'home',
  type: 'document',
	title: 'Home Page',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Meta Title',
      validation: Rule => Rule.required()
    },
    {
      name: 'metadesc',
      type: 'string',
      title: 'Meta Description',
      validation: Rule => Rule.required()
    },
    {
      name: 'statement',
      title: 'Opening Statement',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      validation: Rule => Rule.required()
    },
    {
      title: 'Projects',
      name: 'projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'featured'},
          ]
        }
      ]
    },
  ],
}