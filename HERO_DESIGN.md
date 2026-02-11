# Hero Section - Design Portfolio

## ✨ Features

This hero section is inspired by modern, minimalist portfolio designs with:

### 🎨 Design Elements

1. **Large Bold Heading**
   - "I'm Himanshu." in huge, bold typography
   - Clean, impactful first impression

2. **Professional Navigation**
   - Logo with current time (IST)
   - Menu items: About, Work, Photography, Blogs
   - "Get in Touch" CTA button

3. **Introduction Text**
   - Personal bio with age and role
   - Highlighted company name (yellow background)
   - Simple, conversational tone

4. **Polaroid-Style Photo** (Right Side)
   - White polaroid frame with shadow
   - Rotated slightly for a casual feel
   - Handwritten caption "me.jpeg"
   - Hover effect: straightens on hover

5. **Yellow Sticky Note**
   - "Make it simple!" message
   - Handwriting font (Caveat)
   - Rotated for authenticity

6. **Cyan Badge**
   - "Guwahati Chills" location tag
   - Positioned on polaroid

7. **Social Links**
   - YouTube icon with pin effect
   - Hover animation

8. **Scroll Indicator**
   - Animated mouse scroll icon
   - Bouncing animation

### 🎭 Styling

- **Background**: Subtle grid pattern
- **Colors**: Clean whites, grays, with accent colors (yellow, cyan, red)
- **Typography**: Bold sans-serif for headings, handwriting for notes
- **Animations**: Smooth Framer Motion transitions

### 📝 Customization

To personalize this hero section:

1. **Change Name**: Edit "Himanshu" in the heading
2. **Update Bio**: Modify age, role, and company name
3. **Add Photo**: Replace the placeholder with your image
4. **Customize Colors**: Adjust yellow highlight, cyan badge colors
5. **Update Links**: Add your social media links

### 🖼️ Adding Your Photo

Replace the placeholder div with:

```tsx
<Image
    src="/your-photo.jpg"
    alt="Your Name"
    fill
    className="object-cover"
/>
```

Place your photo in the `public` folder.

### 🎨 Color Scheme

- **Primary**: Black (#000000)
- **Accent Yellow**: #FDE047 (yellow-300)
- **Accent Cyan**: #22D3EE (cyan-400)
- **Accent Red**: #DC2626 (red-600)
- **Background**: Gray-50 to White gradient

---

**Your clean, professional hero section is ready! 🚀**

Visit http://localhost:3000 to see it in action.
