# UX Redesign Specifications
**Nível Apple de Excelência**
**Uma - UX/UI Expert**

## 🎯 Objetivo
Transformar a plataforma em uma experiência que impressiona com qualidade visual e interações fluidas.

## 🎨 Design System Criado

### ✅ Implementado:
1. **Design Tokens** completos (`src/styles/design-system.css`)
   - Cores semânticas e brand
   - Sistema de espaçamento (4px base unit)
   - Tipografia com escala Major Third
   - Elevação Material Design 3 (6 níveis)
   - Border radius consistente
   - Animações com timing Apple

2. **Tailwind Config** atualizado
   - Paleta de cores expandida (50-950)
   - Semantic colors (success, warning, error, info)
   - Animações personalizadas (fade-in, slide-up, scale-in)
   - Ease functions (apple, spring)
   - Elevation shadows

3. **Global Styles** profissionais
   - Componentes reutilizáveis (cards, buttons, inputs, badges, alerts)
   - Scrollbar customizada (Apple-style)
   - Typography hierarchy
   - Hover effects (lift, scale, glow)
   - Glassmorphism utilities

## 🔄 Próximos Passos - Implementação

### Fase 1: Componentes Base
Redesenhar com o novo design system:

#### 1. **StatCard** - Card de Estatísticas
```tsx
// Melhorias:
- Usar .stat-card class
- Adicionar hover-lift effect
- Icon com gradiente sutil
- Trend indicator animado
- Number com animação counter
- Micro-interação no hover
```

#### 2. **Sidebar** - Navegação
```tsx
// Melhorias:
- Glassmorphism backdrop
- Active state com glow effect
- Smooth transitions
- Icon animations on hover
- User card elevated
- Mobile menu com slide-in animation
```

#### 3. **PageHeader** - Cabeçalho
```tsx
// Melhorias:
- Gradient text no título
- Breadcrumb animado
- Glassmorphism no background
- Fade-in animation
```

### Fase 2: Páginas

#### Dashboard
```tsx
// Melhorias:
- Cards com stagger animation (delay-100, delay-200, delay-300)
- Chart com elevation-3
- Recent campaigns com hover-lift
- Alerts com slide-down animation
- Loading skeleton animado
```

#### Disparos
```tsx
// Melhorias:
- Step indicator com progress animation
- File upload com drag & drop visual feedback
- Preview table com elevation
- Success state com confetti animation (framer-motion)
```

#### Templates
```tsx
// Melhorias:
- Template cards com hover-glow
- Approval badge animado
- WhatsApp preview com glassmorphism
- Filter tabs com underline animation
```

#### Campanhas
```tsx
// Melhorias:
- Chart com gradient fills
- Performance cards com trend sparklines
- Export button com loading state
- Date picker com glassmorphism
```

### Fase 3: Micro-interações

#### Animações para adicionar:
1. **Number Counter** - Animar números quando carregam
2. **Progress Bars** - Animação de preenchimento
3. **Toast Notifications** - Slide-in from top
4. **Modal** - Scale-in com backdrop blur
5. **Dropdown** - Slide-down animation
6. **Tabs** - Underline slide animation
7. **Accordion** - Smooth expand/collapse

### Fase 4: Responsividade

#### Breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

#### Adaptações:
- Sidebar → Mobile drawer
- Grid columns responsive
- Font sizes escalando
- Spacing ajustado
- Touch-friendly buttons (min 44px)

## 📐 Especificações Técnicas

### Spacing Scale (usar consistentemente)
```
p-2  = 8px   (tight)
p-4  = 16px  (normal)
p-6  = 24px  (comfortable)
p-8  = 32px  (spacious)
p-12 = 48px  (very spacious)
```

### Border Radius (usar consistentemente)
```
rounded-md  = 12px  (small elements)
rounded-lg  = 16px  (cards, buttons)
rounded-xl  = 24px  (large cards)
rounded-2xl = 32px  (hero sections)
```

### Shadows (usar hierarquia)
```
elevation-1 = Subtle (tags, badges)
elevation-2 = Default cards
elevation-3 = Hover state
elevation-4 = Active/Dragging
elevation-5 = Modals
elevation-6 = Popovers/Tooltips
```

### Typography Scale
```
text-xs   = 12px  (captions, labels)
text-sm   = 14px  (body secondary)
text-base = 16px  (body primary)
text-lg   = 18px  (emphasized)
text-xl   = 20px  (card titles)
text-2xl  = 25px  (section headers)
text-3xl  = 31px  (page headers)
```

## 🎬 Animations Guidelines

### Timing:
- **Instant**: 0ms - feedback imediato
- **Fast**: 150ms - hover states
- **Normal**: 250ms - transitions padrão
- **Slow**: 350ms - animações complexas
- **Slower**: 500ms - hero animations

### Easing:
- **ease-apple**: Padrão para todas as transitions
- **ease-spring**: Para interactions playful
- **ease-out**: Para saídas suaves

## ✅ Checklist de Qualidade

Para cada componente redesenhado:
- [ ] Usa design tokens do sistema
- [ ] Spacing consistente (4px base)
- [ ] Elevation apropriada
- [ ] Hover/focus states definidos
- [ ] Animações suaves (ease-apple)
- [ ] Acessibilidade (ARIA, keyboard)
- [ ] Responsivo (mobile/tablet/desktop)
- [ ] Loading states
- [ ] Error states
- [ ] Empty states

## 🚀 Prioridade de Implementação

1. **Alta**: Dashboard (primeira impressão)
2. **Alta**: Sidebar (sempre visível)
3. **Média**: Disparos (core feature)
4. **Média**: Templates (core feature)
5. **Baixa**: Campanhas (analytics)
6. **Baixa**: Settings (utility)

---

**Next Step**: Delegar implementação para `/agents:dev` (Dex)
