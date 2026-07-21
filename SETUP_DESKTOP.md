# Setup en Desktop — pasos al llegar a tu compu

Guía rápida para dejar operativo este repo en la versión **desktop** de Claude Code.

Hay dos cosas involucradas y funcionan distinto:

| | **Skill** (`ui-ux-pro-max`) | **MCP** (`magic` de 21st.dev) |
|---|---|---|
| Dónde vive | Dentro del repo (`.claude/skills/`) | Config personal de tu máquina |
| Viaja con el código | Sí — ya está commiteado | No — se instala por máquina |
| Qué haces en desktop | Solo `git pull` | Correr `claude mcp add` a mano |

---

## 1. Bajar el skill (ya está en el repo — NO se reinstala)

El skill `ui-ux-pro-max` ya está versionado en `.claude/skills/ui-ux-pro-max/`.
Claude Code lo detecta solo al abrir el proyecto. Solo tienes que tener los archivos:

**Si ya mergeaste el PR #1 a `main`:**
```bash
git pull origin main
```

**Si aún NO lo mergeas (probar la rama directo):**
```bash
git fetch origin
git checkout claude/ui-ux-pro-max-install-67CEr
```

Listo — al abrir el proyecto en Claude Code desktop, el skill queda disponible automáticamente.

---

## 2. Instalar el Magic MCP (esto SÍ es manual, por máquina)

El Magic MCP no vive en el repo; es configuración local. Córrelo en tu terminal:

```bash
claude mcp add magic --scope user -e API_KEY="TU_API_KEY_COMPLETA" -- npx -y @21st-dev/magic@latest
```

### Ojo con la API key
- Es la key de **21st.dev**, NO la de Anthropic (`sk-ant-...`). Nunca pongas la de Anthropic aquí.
- Sácala completa de: https://21st.dev/magic/console
- Escríbela **directo en tu terminal**, no la pegues en chats ni la commitees al repo.

### Scope
- `--scope user` → disponible en todos tus proyectos (config en `~/.claude.json`).
- `--scope project` → solo este repo (se guarda en `.mcp.json`). Si usas este, **NO** commitees la key en texto plano — usa `-e API_KEY='${MAGIC_API_KEY}'` y define la variable en tu entorno.

---

## 3. Reiniciar y verificar

```bash
# Reinicia Claude Code para que el MCP conecte, luego:
claude mcp list
```

Deberías ver `magic` en la lista.

---

## Cómo se complementan
- **`ui-ux-pro-max` (skill)** → inteligencia de diseño: estilos, paletas, tipografías, guidelines UX.
- **`magic` (MCP)** → genera el componente UI (lo invocas con `/ui` en tu prompt).

Uno decide *cómo* debe verse; el otro *lo construye*.

> ⚠️ El brief y el design system de Automate IT (`WEBSITE_BRIEF.md`, Manual de Marca) **mandan**
> ante cualquier sugerencia del skill o del MCP que los contradiga.
