---
title: "Mettre à jour Proxmox"
draft: false
lang: fr
translations:
    en: notelocation.en
tags:
    - resources
---
# Update le Proxmox server

1. Aller sur la page web : **https://192.168.1.201:8006/**

2. Naviguer dans : Datacenter -> pve -> Updates -> Repositories

3. Désactiver les 2 liens suivants:
    - https://entreprose.proxmox.com/debian/ceph-quincy
    - https://entreprose.proxmox.com/debian/pve

4. Ajouter le repository suivant :
    - **Ceph Reef No-Subscription**

5. Mettre à jour Proxmox en cliquant sur **Update** puis **Refresh** et quand le téléchargements des paquets est fini, cliquer sur **Upgrade**

---

## Links

202506270723

[[proxmox]]

[[resources]]
