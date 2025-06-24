---
title: "terminal"
draft: false
lang: fr
translations:
    en: notelocation.en
tags:
    - MOC
---
# Comment je suis productif

Gère tout mon système [[wsl]] et mon [[Zettelkasten]]

Bien que je l'utilise pour [[Windows]] j'évite de travailler sur cette [[OS]]

Tous les tips and tricks pour naviguer ou faciliter la vie sur le Terminal.

- Terminal utilisé : [[Alacritty]]

- Editeur : [[VIM]]

## Terminal

```dataview
LIST
FROM #Terminal OR [[Terminal]] AND [[MOC]]
WHERE
  !contains(lower(file.name), "templater")
  AND !contains(lower(file.name), "template")
  AND !contains(lower(file.name), "zettelkasten")
  AND !contains(lower(file.name), "script")
SORT file.name ASC
```

## Tous les projets/notes qui sont pour le terminal


```dataview
LIST
FROM #Terminal OR [[Terminal]] AND -[[MOC]]
WHERE
  !contains(lower(file.name), "templater")
  AND !contains(lower(file.name), "template")
SORT file.name ASC
```


---

## Links

202504181837

[[MOC]]
