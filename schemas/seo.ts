// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: 'seo',
  type: 'document',
	title: 'SEO Fields',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Meta Title',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      type: 'string',
      title: 'Meta Description',
      validation: Rule => Rule.required()
    },
  ]
}