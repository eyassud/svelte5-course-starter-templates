import { defineField, defineType } from 'sanity';

export const skills = defineType({
    name: 'skills', title: 'Skills', type: 'document', fields: [
        defineField({
            name: 'skillsList',
            title: 'Skills Lis',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'name', type: 'string', title: 'Skill Name', validation: (Rule) => Rule.required() }),
                        defineField({ name: 'iconClass', type: 'string', title: 'Icon Class Name', validation: (Rule) => Rule.required() }),
                    ]
                }
            ],
        }),

    ],
});