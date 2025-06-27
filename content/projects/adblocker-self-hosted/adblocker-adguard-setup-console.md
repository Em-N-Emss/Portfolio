---
title: "Adguard installation dans le Container Proxmox"
draft: false
lang: fr
translations:
    en: notelocation.en
tags:
    - project
    - automation
---
# Installation d'AdGuard Home dans le container proxmox

Après avoir [[adblocker-adguard-container|installé]] le container sur le serveur Proxmox, je vais maintenant installer AdGuard Home dans le container.

## Lancement du container AdGuard Home

Sur le GUI Proxmox aller sur le container, le lancer et aller dans la console.

> [!NOTE]
> Lancer les test de pings pour voir si la gateway est bien inititalisée.

## Installation d'AdGuard Home

Pour installer AdGuard Home, il faut utiliser la commande suivante (cf.[documentation](https://github.com/AdguardTeam/AdGuardHome)):

```bash
curl -s -S -L https://raw.githubusercontent.com/AdguardTeam/AdGuardHome/master/scripts/install.sh | sh -s -- -v
```

ou

```bash
wget --no-verbose -O - https://raw.githubusercontent.com/AdguardTeam/AdGuardHome/master/scripts/install.sh | sh -s -- -v
```

## Configuration d'AdGuard Home sur la page Web

Suite à l'installation, une adresse IP sera disponible pour accéder à la page web d'AdGuard Home :

![[Pasted image 20250627133937.png]]

Ici selon ma configuration : **192.168.1.203:3000**

Il faut ensuite rentrer l'adresses configuré dans les champs comme ci-dessous :

![[Pasted image 20250627134332.png]]

---

## Links

202506271323

https://github.com/AdguardTeam/AdGuardHome

[[proxmox]]

[[homelab]]
