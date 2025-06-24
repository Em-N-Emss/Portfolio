---
title: Rédiger une note
draft: false
lang: fr
translations:
  en: Resources/Use-Note-Templater.en
tags:
    - Resources
---
# Comment utiliser le template pour prendre les notes

Basé sur mes notes utilisées dans mon Second-Brain

Ce template reprend les même base et ajoute le nécessaire pour que Quartz puisse ait les informations nécessaire pour déployer les notes

J'utilise VIM avec des bash scripts pour fluidifier la prise de note

## Le template

Il se présente sous la forme suivante dans un note en français :

```md
---
title: <% tp.file.title %>
draft: false
lang: fr
translations:
    en: notelocation.en
tags:
    -
---
#

---

## Links

<% tp.date.now("YYYYMMDDHHmm") %>
```

## Comment ça marche

### Rédaction de la note

Cela se fait etre les 2 **---**

### Note individuelle

L'idée est de se baser sur un format Zettelkasten revisité.

Prise de note basé sur la rapidité avec un principe de datation pour retrouver une note à un instant T.

La datation se fait à base de YYYYMMDDHHmm (Année, Mois, Jour, Heures, Minutes) rendant l'identification de chaque note unique.

### Le Frontmatter

- **title** pour prendre directement le titre de la note.

- **draft** pour marquer la note comme à publier ou non.

- **lang** pour indiquer la langue de la note.

- **translations** pour indiquer les autres versions de la note.
    - Ex : `en: notelocation.en` -> Note en anglais.
    - Ex : `fr: notelocation` -> Note en français (par défaut).

- **tags** pour les notes avec des tags.

Selon cette [page](https://quartz.jzhao.xyz/authoring-content), voici à quoi servent les frontmatters dans le cas de Quartz:

> Some common frontmatter fields that are natively supported by Quartz:
>
> **title**: Title of the page. If it isn’t provided, Quartz will use the name of the file as the title.
> **description**: Description of the page used for link previews.
> **permalink**: A custom URL for the page that will remain constant even if the path to the file changes.
> **aliases**: Other names for this note. This is a list of strings.
> **tags**: Tags for this note.
> **draft**: Whether to publish the page or not. This is one way to make pages private in Quartz.
> **date**: A string representing the day the note was published. Normally uses YYYY-MM-DD format.

---

## Links

202506171750

https://quartz.jzhao.xyz/authoring-content

[[resources]]
