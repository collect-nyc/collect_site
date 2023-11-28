// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: 'info',
  type: 'document',
	title: 'Index Page',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required()
    },
    {
      type: 'array',
      name: 'press',
      title: 'Press',
      of: [
        {
          title: 'Press Fields',
          name: 'pressFields',
          type: 'object',
          fields: [
            {
              type: 'string',
              name: 'articlename',
              title: 'Article Name',
            },
            {
              type: 'string',
              name: 'pubdate',
              title: 'Pub Date',
            },
            {
              type: 'string',
              name: 'author',
              title: 'Author',
            },
            {
              type: 'string',
              name: 'publication',
              title: 'Publication',
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
        },
      ],
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
    {
      type: 'array',
      name: 'updates',
      title: 'Updates',
      of: [
        {
          title: 'Updates Fields',
          name: 'updatesFields',
          type: 'object',
          fields: [
            {
              type: 'string',
              name: 'date',
              title: 'Date',
            },
            {
              name: 'text',
              title: 'Text',
              type: 'array',
              of: [
                {
                  type: 'block',
                },
              ],
            },
            {
              title: 'Link',
              name: 'href',
              type: 'url',
              validation: Rule => Rule.uri({
                scheme: ['http', 'https', 'mailto', 'tel']
              })
            }
          ]
        },
      ],
    },
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
    {
      name: 'social',
      title: 'Social',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
  ],
}