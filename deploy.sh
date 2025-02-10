#!/bin/bash

# Définir les couleurs
NC='\033[0m'  # Aucun (reset)
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
WHITE='\033[0;37m'

# Vérification de l'espace disque avant
echo -e "${YELLOW}VÉRIFICATION DE L'ESPACE AVANT LE DÉPLOIEMENT:${NC}"
df -h /

# Créer le réseau externe si nécessaire
echo -e "${CYAN}Vérification et création du réseau externe ${WHITE}tennis-de-table-cloysien_default${NC} ${CYAN}si besoin...${NC}"
docker network create tennis-de-table-cloysien_default || echo -e "${CYAN}Le réseau ${WHITE}tennis-de-table-cloysien_default${CYAN} existe déjà.${NC}"

# Arrêter et supprimer les conteneurs, réseaux, volumes, et images associés au projet
docker-compose down

# Rebuild les images et relancer les services en mode détaché
docker-compose up --build -d

# Nettoyer les images et conteneurs inutilisés pour libérer de l'espace
docker system prune -f

# Nettoyer les volumes inutilisés
docker volume prune -f

# Nettoyer les images non utilisées
docker image prune -af

# Nettoyer les caches de construction Docker
docker builder prune -f

# Vérification de l'espace disque après le déploiement
echo -e "${YELLOW}DÉPLOIEMENT TERMINÉ, VÉRIFICATION DE L'ESPACE APRÈS LE DÉPLOIEMENT :${NC}"
df -h /
