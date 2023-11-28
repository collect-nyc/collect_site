// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: 'images',
  type: 'document',
	title: 'Select Images',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'description',
      type: 'string',
      title: 'Description',
    },
    {
      type: 'array',
      name: 'images',
      title: 'Select Images',
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