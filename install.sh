#!/bin/bash

CYAN='\033[1;36m'
MAGENTA='\033[1;35m'
NC='\033[0m' # No Color

cd ~
DIRECTORIO="~/bot_telegram"

# Verificar si la carpeta existe
if [ -d "$DIRECTORIO" ]; then
    echo -e "${CYAN}Eliminando carpeta $DIRECTORIO...${NC}"
    rm -rf "$DIRECTORIO"
fi
rm -rf ~/bot_telegram
rm ~/bot_telegram.rar

echo -e "${CYAN}[+] Concede permisos de almacenamiento...${NC}"
#termux-setup-storage

echo -e "${CYAN}[+] Actualizando paquetes...${NC}"
pkg update && pkg upgrade -y

echo -e "${CYAN}[+] Instalando paquetes necesarios...${NC}"
pkg install python git nano -y
pkg install unrar -y
pkg install python -y
pkg install wget -y

# echo -e "${CYAN}[+] Copiando carpeta /sdcard/bot_telegram.rar > ~/ ...${NC}"
# cp /sdcard/bot_telegram.rar ~/

echo -e "${CYAN}[+] Descargando bot_telegram.rar...${NC}"
wget https://github.com/waldir182/code/raw/main/bot_telegram.rar

echo -e "${CYAN}[+] Extrayendo bot_telegram.rar...${NC}"
unrar x ~/bot_telegram.rar
cd ~/bot_telegram

# echo -e "${CYAN}[+] Copiando archivo credentials.json ./ ...${NC}"
# cp /sdcard/credentials.json ./

echo -e "${CYAN}[+] Instalando dependencias de Python...${NC}"
pip install -r requirements.txt

echo -e "${CYAN}[+] Agregando alias 'iniciar=python main.py' al ~/.bashrc...${NC}"
if grep -Fxq 'alias bot="python ~/bot_telegram/bot.py"' ~/.bashrc; then
    echo -e "${CYAN}El alias ya está presente en ~/.bashrc${NC}"
else
    echo 'alias iniciar_bot="python ~/bot_telegram/bot.py"' >> ~/.bashrc
    echo 'alias configurar_bot="python ~/bot_telegram/configurar_variables.py"' >> ~/.bashrc
    echo 'alias cn="python ~/bot_telegram/configurar_variables.py"' >> ~/.bashrc
    echo 'alias BROWSER="termux-open-url"' >> ~/.bashrc
    echo -e "${CYAN}Alias agregado exitosamente.${NC}"
fi
source ~/.bashrc
. ~/.bashrc
#exec $BASH

echo -e "${CYAN}[+] Configurando variables de entorno...${NC}"
python configurar_variables.py

echo ""
echo -e "${CYAN}Para iniciar el bot, ejecuta ${MAGENTA}'iniciar_bot'${CYAN} en la terminal.${NC}"
echo -e "${CYAN}Para configurar el bot, ejecuta ${MAGENTA}'configurar_bot'${CYAN} en la terminal.${NC}"

echo -e "${CYAN}[+] Instalación completada.${NC}"
