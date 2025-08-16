# Arabic Font Setup

This document explains how the IBM Plex Sans Arabic font is configured for RTL (Right-to-Left) text in the Tune8 frontend.

## Font Files

The Arabic font files are located in `/public/fonts/` and include:

- `IBMPlexSansArabic-Thin.otf` (weight: 100)
- `IBMPlexSansArabic-ExtraLight.otf` (weight: 200)
- `IBMPlexSansArabic-Light.otf` (weight: 300)
- `IBMPlexSansArabic-Regular.otf` (weight: 400)
- `IBMPlexSansArabic-Text.otf` (weight: 450)
- `IBMPlexSansArabic-Medium.otf` (weight: 500)
- `IBMPlexSansArabic-SemiBold.otf` (weight: 600)
- `IBMPlexSansArabic-Bold.otf` (weight: 700)

## Configuration

### 1. Font Face Declarations

Font face declarations are added to `src/app/globals.css` to load all font weights with proper fallbacks.

### 2. RTL Font Styling

The `.rtl` class is automatically applied when the locale is Arabic (`ar`) and includes:

- Font family: `'IBM Plex Sans Arabic'` with fallbacks
- Proper font feature settings for Arabic text rendering
- Optimized text rendering settings

### 3. Layout Integration

The locale-specific layout (`src/app/[locale]/layout.tsx`) automatically applies:

- `dir="rtl"` for RTL direction
- `lang="ar"` for Arabic language
- `.rtl` class for font styling
- `.font-arabic` utility class

## Usage

### Automatic Application

When the locale is set to Arabic (`ar`), the Arabic font is automatically applied to all text content.

### Manual Application

You can manually apply the Arabic font using the `.font-arabic` utility class:

```tsx
<div className="font-arabic">Arabic text here</div>
```

### Font Weights

All font weights are available and can be used with standard CSS font-weight properties:

```css
.light-text {
  font-weight: 300;
}
.regular-text {
  font-weight: 400;
}
.medium-text {
  font-weight: 500;
}
.bold-text {
  font-weight: 700;
}
```

## Testing

To test the Arabic font:

1. Navigate to `/ar` route (Arabic locale)
2. Verify that Arabic text renders with the IBM Plex Sans Arabic font
3. Check that font weights work correctly
4. Ensure proper RTL text rendering

## Browser Support

The font setup includes:

- `font-display: swap` for better loading performance
- Fallback fonts for better compatibility
- Proper font feature settings for Arabic text rendering
