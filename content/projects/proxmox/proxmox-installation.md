---
title: "Proxmox installation"
draft: false
lang: fr
translations:
    en: notelocation.en
tags:
    -
---
# Comment installer Proxmox avec une petite clé USB

J'utilise Ventoy pour avoir un bootable USB.

Aller dessus pour chopper l'iso de Proxmox : https://proxmox.com/en/downloads

Après avoir booté la clé USB, j'ai fait l'installationa avec **xfs** plûtot que **ext4** pour la vitesse des gros fichiers

## Management Network Configuration

L'adresse IP est défini selon la plage de mon [[DHCP]].

Comme ce dernier s'étend de **192.168.1.1** jusqu'à **192.168.1.200**, j'utilise l'adresse **192.168.1.201** comme IP statique pour [[proxmox]]

Mes autres VMs suivront le même schéma ( VM1 : 192.168.1.202, VM2 : 192.168.1.203...)

> ![NOTE]
> Ne pas oublier de décocher "Automatically reboot after successful installation" car :
> - Si jamais il y a un problème dans l'installation ce sera plu ssimple de redéarrer l'installation
> - Si après l'installation la clé usb reboot, le pc va reboot la clé usb en boucle (been there done that)

## Utilisation de Proxmox

Maintenant proxmox est accessible sur l'adresse **https://192.168.1.201:8006**

- Voir ici comment retirer le pop-up de souscription : [[proxmox-popup-subscription-disabled]]

---

## Links :

202506211610

[[homelab]]

[[proxmox]]
