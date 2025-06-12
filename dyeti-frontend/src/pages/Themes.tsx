import { useTheme } from 'styled-components';

import { useThemeMode } from '../theme/AppThemeProvider.tsx';

const Themes = () => {
  const { toggle } = useThemeMode();
  const theme = useTheme();

  const { borderRadius, borderWidth, breakpoints, typography } = theme;
  const { colors } = theme;
  return (
    <div>
      <button
        onClick={toggle}
        style={{
          padding: '0.5rem 1rem',
          borderRadius: borderRadius.medium,
          borderWidth: borderWidth.normal,
          borderStyle: 'solid',
          borderColor: colors.primary[500],
          backgroundColor: colors.primary[100],
          color: colors.primary[900],
          cursor: 'pointer',
          marginBottom: '2rem',
        }}
      >
        Przełącz motyw (Light / Dark)
      </button>

      <section>
        <h2>Border Radius</h2>
        <ul>
          {Object.entries(borderRadius).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong>{' '}
              <span
                style={{
                  display: 'inline-block',
                  width: '30px',
                  height: '30px',
                  backgroundColor: colors.primary[500],
                  borderRadius: value,
                }}
              />{' '}
              ({value})
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Border Width</h2>
        <ul>
          {Object.entries(borderWidth).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong>{' '}
              <div
                style={{
                  width: '100px',
                  borderBottom: `${value} solid ${colors.primary[500]}`,
                }}
              />{' '}
              ({value})
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Breakpoints</h2>
        <ul>
          {Object.entries(breakpoints).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Typography</h2>
        <p>
          <strong>Font Family:</strong> {typography.fontFamily}
        </p>

        <h3>Font Sizes</h3>
        <ul>
          {Object.entries(typography.fontSize).map(([key, value]) => (
            <li key={key} style={{ fontSize: value }}>
              {key} ({value}) — przykładowy tekst
            </li>
          ))}
        </ul>

        <h3>Font Weights</h3>
        <ul>
          {Object.entries(typography.fontWeight).map(([key, value]) => (
            <li key={key} style={{ fontWeight: value }}>
              {key} ({value}) — przykładowy tekst
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Colors</h2>
        {Object.entries(colors).map(([colorGroup, groupValue]) => {
          if (typeof groupValue !== 'object') {
            return (
              <div key={colorGroup}>
                <strong>{colorGroup}:</strong> {groupValue}
              </div>
            );
          }
          return (
            <div key={colorGroup} style={{ marginBottom: '1rem' }}>
              <strong>{colorGroup}:</strong>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {Object.entries(groupValue).map(([shade, hex]) => (
                  <div
                    key={shade}
                    title={`${colorGroup} ${shade}: ${hex}`}
                    style={{
                      backgroundColor: hex,
                      width: '50px',
                      height: '50px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: parseInt(hex.replace('#', ''), 16) > 0xffffff / 2 ? '#000' : '#fff',
                      fontSize: '0.7rem',
                      userSelect: 'none',
                    }}
                  >
                    {shade}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Themes;
