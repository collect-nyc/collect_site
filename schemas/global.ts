// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: 'global',
  type: 'document',
	title: 'Global Content',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Services Descriptor',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Services',
      name: 'services',
      type: 'array',
      of: [{type: 'string'}],
      validation: Rule => Rule.required()
    },
  ]
}