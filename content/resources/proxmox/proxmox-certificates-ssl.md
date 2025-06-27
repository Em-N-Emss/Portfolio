---
title: "Proxmox - Certificats SSL"
draft: false
lang: fr
translations:
    en: notelocation.en
tags:
    - resources
---
# Proxmox - Certificats SSL

> [!IMPORTANT]
> Il faut ouvrir les ports 80 pour que le serveur ACME intégré à [[proxmox]] puisse accéder à la page web de ce dernier.

L'idée est d'ajouter des certificats SSL aux serveurs Proxmox.

## Comment faire ?

1. Sur la page web de [[proxmox]], aller sur `pve` et cliquer sur `Certificates` dans la catégorie `Network`.

2. Cliquer sur `Add ACME Account` et renseigner les champs et accepter les termes du contrat
    - ça donne cela quand tout est fait : ![[Pasted image 20250627163537.png]]

3. Ajouter un nom de domaine pour l'enregistrement SSL avec le bouton `Add`
    - Par exemple j'vais appelé le mien **pve-em-home.fr**

---

## Links

202506271631

[[proxmox]]
