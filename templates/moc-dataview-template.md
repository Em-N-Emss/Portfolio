```dataview
LIST
FROM #<% tp.file.title %> OR [[<% tp.file.title %>]]
WHERE
  !contains(lower(file.name), "templater")
  AND !contains(lower(file.name), "template")
SORT file.name ASC
```
