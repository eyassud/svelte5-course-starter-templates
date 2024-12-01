import { defineField, defineType } from "sanity";
export const devExperience = defineType({
    name: "devExperience", title: "Dev Experience", type: "document", fields: [
        defineField({
            name: "jonTitle",
            title: "Job Title",
            type: "string",
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "company",
            title: "Company",
            type: "text",
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "startDate",
            title: "Start Date",
            type: "date",
            validation: Rule => Rule.required(),
            options: {
                dateFormat: "YYYY-MM",
            }
        }),
        defineField({
            name: "endDate",
            title: "End Date",
            type: "date",
            options: {
                dateFormat: "YYYY-MM",
            }
        }),
    ],
});