// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: 'services',
  type: 'document',
	title: 'Services Page',
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
      name: 'workwithus',
      title: 'Work With Us',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      validation: Rule => Rule.required()
    },
    {
      title: 'Offerings',
      name: 'offering',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'offering'},
          ]
        }
      ]
    },
    {
      name: 'wow',
      title: 'Ways of Working',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'projects',
      title: 'Self Contained Projects',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'retainers',
      title: 'Ongoing Retainers',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'teams',
      title: 'Scalable Teams',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      validation: Rule => Rule.required()
    },
  ],
}