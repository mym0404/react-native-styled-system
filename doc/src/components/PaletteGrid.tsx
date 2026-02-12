import styles from './PaletteGrid.module.css';

const PaletteGrid = ({ name, shades }: { name: string; shades: Record<string, string> }) => (
  <div className={styles.palette}>
    <div className={styles.paletteName}>{name}</div>
    <div className={styles.shades}>
      {Object.entries(shades).map(([shade, hex]) => (
        <div key={shade} className={styles.shade}>
          <div className={styles.shadeBlock} style={{ backgroundColor: hex }} />
          <span className={styles.shadeLabel}>{shade}</span>
          <span className={styles.shadeHex}>{hex}</span>
        </div>
      ))}
    </div>
  </div>
);

export default PaletteGrid;
