# ISST-AgileICT-G02
En este espacio desarrollaremos la aplicación web de AgileICT

# 📌 Guía básica de Git y GitHub  

Todo esto lo haceis en la terminal de VSCode

## 🚀 Primeros pasos (configuración inicial)  

Si es la primera vez que usas Git en tu PC, configúralo con tu nombre y correo (usad el que tengais en Github):  

```sh  
git config --global user.name "TuNombre"  
git config --global user.email "tuemail@example.com"  
```  

Clona el repositorio para obtener el código en tu computadora:  

```sh  
git clone https://github.com/JavierMorgado/ISST-AgileICT-G02 
cd NOMBRE_DEL_REPOSITORIO  
```  

## 📥 Antes de empezar a trabajar (descargar cambios más recientes)  

Siempre asegúrate de tener la última versión del código antes de modificar nada:  

```sh  
git pull origin main  
```  

## 🛠 Hacer cambios en el código  

1. Crea una nueva rama para trabajar en una funcionalidad específica:  
   ```sh  
   git checkout -b nombre-de-la-rama  
   ```  
2. Realiza cambios en los archivos y guárdalos.  
3. Añade los archivos al área de preparación:  
   ```sh  
   git add .  
   ```  
4. Guarda los cambios con un mensaje claro:  
   ```sh  
   git commit -m "Descripción breve del cambio"  
   ```  
5. Sube los cambios a GitHub:  
   ```sh  
   git push origin nombre-de-la-rama  
   ```  

## 🔄 Fusionar cambios en `main`  

1. En GitHub, abre un **Pull Request** desde la rama donde trabajaste hacia `main`.  
2. Espera la revisión y aprobación de otro miembro del equipo.  
3. Una vez aprobado, fusiona los cambios en `main`.  
4. Todos deben actualizar su código con:  
   ```sh  
   git pull origin main  
   ```  

## ⚠ Resolver conflictos  

Si Git detecta conflictos, sigue estos pasos:  

1. Abre los archivos en conflicto en VS Code y edítalos manualmente.  
2. Una vez resueltos, guarda los cambios y ejecuta:  
   ```sh  
   git add .  
   git commit -m "Conflicto resuelto"  
   git push origin nombre-de-la-rama  
   ```  
3. Continúa con el proceso de Pull Request.  

## 🔚 Resumen rápido  

1️⃣ **Actualizar código:** `git pull origin main`  
2️⃣ **Crear una nueva rama:** `git checkout -b nombre-de-la-rama`  
3️⃣ **Hacer cambios y guardarlos:** `git add .` → `git commit -m "mensaje"`  
4️⃣ **Subir cambios:** `git push origin nombre-de-la-rama`  
5️⃣ **Crear un Pull Request en GitHub y fusionarlo**  
6️⃣ **Actualizar con los últimos cambios:** `git pull origin main`  

💡 **Consejo:** Trabaja siempre en una rama separada y revisa bien los cambios antes de subirlos.  
📢 ¡Cualquier duda, pregunta en el grupo!   



Patata