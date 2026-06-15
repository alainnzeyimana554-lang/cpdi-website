import { defineType, defineField } from "sanity";

export default defineType({
  name: "galleryItem",
  title: "Photo Galerie",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "itemId",
      title: "Identifiant",
      type: "string",
      description: "Ex: paix-01, dev-03, evt-02",
    }),
    defineField({
      name: "category",
      title: "Categorie",
      type: "string",
      options: {
        list: [
          { title: "Paix", value: "paix" },
          { title: "Developpement", value: "developpement" },
          { title: "Environnement", value: "environnement" },
          { title: "Evenements", value: "evenements" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "location",
      title: "Lieu",
      type: "string",
      description: "Ex: Gitega, Burundi",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "string",
      description: "Ex: Mai 2026",
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
    },
  },
});
