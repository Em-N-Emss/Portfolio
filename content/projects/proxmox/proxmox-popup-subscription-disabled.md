---
title: "Désactiver le pop-up souscription proxmox"
draft: false
lang: fr
translations:
    en: notelocation.en
tags:
    - automation
---
# Comment désactiver cette notification à chaque entrée

1. SSH dans le serveur [[proxmox]]
    - Dans mon cas ce sera (cf. [[proxmox-installation]]):
    ```bash
    ssh root@192.168.1.201
    ```

2. Accèder au dossier suivant :
```bash
cd /usr/share/javascript/proxmox-widget-toolkit
```

> ![IMPORTANT]
> Faire un backup du fichier **proxmoxlib.js**
> ```bash
> cp proxmoxlib.js proxmoxlib.js.bak
> ```

3. Modifier le fichier **proxmoxlib.js** :

```bash
vi proxmoxlib.js
```

4. Rechercher la ligne suivante : **No valid sub**
    - Ce dernier se trouvera dans les lignes suivantes :
    ```js
                    success: function(response, opts) {
                    let res = response.result;
                    if (res === null || res === undefined || !res || res
                        .data.status.toLowerCase() !== 'active') {
                        Ext.Msg.show({
                            title: gettext('No valid subscription'),
                            icon: Ext.Msg.WARNING,
                            message: Proxmox.Utils.getNoSubKeyHtml(res.data.url),
                            buttons: Ext.Msg.OK,
                            callback: function(btn) {
                                if (btn !== 'ok') {
                                    return;
                                }
                                orig_cmd();
                            },
                        });
                    } else {
                        orig_cmd();
                    }
                },
    ```

5. Supprimer les 15 prochaines lignes en partant de **let res = response.result;**
    > ![NOTE]
    > Ne pas oublier de supprimer le **}** en dessous de la ligne **orig_cmd();**
    - Ce qui donnera :
    ```js
                success: function(response, opts) {
                    orig_cmd();
                },
    ```

6. Redémarrer le serveur [[proxmox]]

```bash
systemctl restart pveproxy.service
```

> ![NOTE]
> Si le pop-up est toujours là, faire :
> ```bash
> mv proxmoxlib.js.bak proxmoxlib.js && systemctl restart pveproxy.service
> ```

---

## Links

202506270643

[[proxmox]]

[[bash]]
