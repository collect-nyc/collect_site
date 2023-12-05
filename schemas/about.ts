// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: 'about',
  type: 'document',
	title: 'About Page',
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
      name: 'newbusiness',
      title: 'New Business',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'hiring',
      title: 'Work Opportunities',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      validation: Rule => Rule.required()
    },
    {
      title: "Founders, Principals",
      type: "array",
      name: "founders",
      of: [
        {
          type: "object",
          name: "founder",
          fields: [
            { type: "string", name: "Name" },
            { type: "string", name: "Title" }
          ]
        }
      ],
    },
    {
      title: "Instagram Handles",
      type: "array",
      name: "instagram",
      of: [
        {
          type: "object",
          name: "instalink",
          fields: [
            { type: "string", name: "Account" },
            { type: "url", name: "URL" }
          ]
        }
      ],
    },
    {
      title: "Social Links",
      type: "array",
      name: "sociallinks",
      of: [
        {
          type: "object",
          name: "instalink",
          fields: [
            { type: "string", name: "Account" },
            { type: "url", name: "URL" }
          ]
        }
      ],
    },
    {
      name: 'editions',
      title: 'Éditions Magazine',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'selectedclients',
      title: 'Selected Clients',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      validation: Rule => Rule.required()
    },
    {
      title: 'Clients',
      name: 'clients',
      type: 'array',
      of: [{
        type: "object",
        name: "client",
        fields: [
          { type: "string", name: "name" },
          { type: "url", name: "url" }
        ]
      }]
    },
  ],
}