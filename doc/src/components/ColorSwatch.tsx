import styles from './ColorSwatch.module.css';

const ColorSwatch = ({ color }: { color: string }) => (
  <span className={styles.swatch} style={{ backgroundColor: color }} />
);

export default ColorSwatch;
