# Student Senate Tree Structure

This directory contains the implementation of the interactive tree visualization for IIT Jodhpur's Student Senate structure.

## Features

### 🌳 Interactive Tree Views
- **Hierarchical Tree View**: Collapsible tree structure with expandable nodes
- **Flow Diagram**: Interactive flow chart using ReactFlow with pan and zoom capabilities
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 🔍 Advanced Search
- **Real-time Search**: Instant search across all councils, boards, clubs, and position holders
- **Smart Filtering**: Search by name, full name, or current holder
- **Quick Selection**: Click search results to instantly view details

### 📊 Statistics Dashboard
- **Overview Cards**: Quick stats showing total counts of councils, boards, clubs, and positions
- **Animated Counters**: Smooth animations with Framer Motion
- **Color-coded Categories**: Visual distinction between different organization types

### 🎨 Visual Features
- **Color-coded Nodes**: Different colors for councils (blue), boards (green), committees (orange), and clubs (purple)
- **Smooth Animations**: Framer Motion animations for better user experience
- **Interactive Elements**: Hover effects, click interactions, and smooth transitions

## File Structure

```
app/tree/
├── layout.tsx          # Layout wrapper with gradient background
└── page.tsx           # Main tree page with view toggles and search

components/tree/
├── SenateTree.tsx     # ReactFlow-based flow diagram
├── TreeView.tsx       # Hierarchical collapsible tree view
├── CustomNode.tsx     # Custom node component for ReactFlow
├── SearchableTree.tsx # Search functionality with dropdown results
└── SenateStats.tsx    # Statistics cards component

data/
└── treeData.js        # Mock data structure for the senate hierarchy
```

## Data Structure

The tree data is organized in three main layers:

### Layer 1: Main Bodies (3 nodes)
- **ACAC** - Academic Co-Curricular and Activity Council
- **SS** - Student Senate  
- **SAC** - Student Activity Council

### Layer 2: Boards (13 nodes)
- **Under ACAC**: BAI, BDS, BCD, BIE
- **Under SAC**: BCCA, BLA, BAC, BSS, SAA
- **Under SS**: Direct committees

### Layer 3: Clubs & Committees (50+ nodes)
- Various clubs under each board
- Direct committees under Student Senate

## Technical Implementation

### Dependencies Used
- **ReactFlow**: For the interactive flow diagram
- **Framer Motion**: For smooth animations and transitions
- **Lucide React**: For consistent iconography
- **Tailwind CSS**: For responsive styling

### Key Components

#### SenateTree (Flow Diagram)
- Uses ReactFlow for interactive node-link diagrams
- Custom node types with hover effects
- Minimap and controls for navigation
- Click-to-view-details functionality

#### TreeView (Hierarchical)
- Collapsible tree structure
- Smooth expand/collapse animations
- Color-coded nodes by organization type
- Integrated detail panel

#### SearchableTree
- Real-time search with debouncing
- Dropdown results with type indicators
- Click-to-select functionality
- Mobile-friendly interface

#### SenateStats
- Animated statistics cards
- Gradient backgrounds with icons
- Responsive grid layout
- Motion animations on load

### Responsive Design
- Mobile-first approach
- Adaptive layouts for different screen sizes
- Touch-friendly interactions
- Optimized performance on all devices

## Usage

### Navigation
1. **Search**: Use the search bar to quickly find specific positions or holders
2. **Tree View**: Click arrows to expand/collapse branches, click nodes for details
3. **Flow Diagram**: Pan and zoom with mouse, click nodes for information
4. **Toggle Views**: Switch between tree and flow views using the toggle buttons

### Customization
To add new data or modify the structure:
1. Update `data/treeData.js` with new nodes
2. Maintain the hierarchical relationship using the `parent` field
3. Follow the existing data structure for consistency

## Future Enhancements

### Planned Features
- [ ] Export tree structure as image/PDF
- [ ] Deep linking to specific nodes
- [ ] Advanced filtering by organization type
- [ ] Integration with real-time data from CMS
- [ ] Detailed node information with contact details
- [ ] Historical view of position holders

### Performance Optimizations
- [ ] Virtual scrolling for large datasets
- [ ] Lazy loading of tree branches
- [ ] Caching for search results
- [ ] Progressive loading of images

## Accessibility

The tree structure follows web accessibility guidelines:
- Keyboard navigation support
- Screen reader compatible
- High contrast color schemes
- Clear focus indicators
- Semantic HTML structure

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

*This tree structure provides a comprehensive and interactive way to explore the Student Senate hierarchy at IIT Jodhpur, making it easy for students and stakeholders to understand the organizational structure and find relevant contacts.*
