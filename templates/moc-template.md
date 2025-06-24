---
title: "<% tp.file.title %>"
draft: false
lang: fr
translations:
    en: notelocation.en
tags:
    - MOC
---
# <% tp.file.title %>

```dataview
LIST
FROM #<% tp.file.title %> OR [[<% tp.file.title %>]]
WHERE
  !contains(lower(file.name), "templater")
  AND !contains(lower(file.name), "template")
SORT file.name ASC
```

---

## Links

<% tp.date.now("YYYYMMDDHHmm") %>

[[MOC]]
