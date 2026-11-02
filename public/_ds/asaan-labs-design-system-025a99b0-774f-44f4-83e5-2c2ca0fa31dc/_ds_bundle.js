/* @ds-bundle: {"format":4,"namespace":"AsaanLabsDesignSystem_025a99","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"e744194f8bb3","components/forms/Input.jsx":"b553e9a93ed8"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AsaanLabsDesignSystem_025a99 = window.AsaanLabsDesignSystem_025a99 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children
}) {
  const [hover, setHover] = React.useState(false);
  const v = {
    primary: {
      bg: hover ? 'var(--accent-hover)' : 'var(--accent)',
      fg: 'var(--accent-on)',
      border: 'transparent'
    },
    secondary: {
      bg: 'transparent',
      fg: 'var(--text-primary)',
      border: hover ? 'var(--text-primary)' : 'var(--border-control)'
    },
    ghost: {
      bg: 'transparent',
      fg: hover ? 'var(--text-primary)' : 'var(--text-secondary)',
      border: 'transparent'
    }
  }[variant];
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: size === 'sm' ? 'var(--text-label)' : 'var(--text-button)',
      fontWeight: 600,
      lineHeight: 1.25,
      letterSpacing: 0,
      padding: size === 'sm' ? '8px 14px' : '12px 22px',
      background: v.bg,
      color: v.fg,
      border: `1px solid ${v.border}`,
      borderRadius: 'var(--radius-control)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transition: 'background-color 150ms, border-color 150ms, color 150ms'
    }
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  label,
  placeholder,
  helper,
  value,
  onChange,
  disabled = false
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      fontFamily: 'var(--font-body)',
      width: '100%',
      maxWidth: 360
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-label)',
      fontWeight: 500,
      lineHeight: 1.4,
      color: 'var(--text-primary)'
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    value: value,
    placeholder: placeholder,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      font: 'inherit',
      fontSize: 'var(--text-body-sm)',
      lineHeight: 1.6,
      color: 'var(--text-primary)',
      background: 'transparent',
      padding: '12px 14px',
      outline: 'none',
      border: `1px solid ${focus ? 'var(--focus-ring)' : 'var(--border-control)'}`,
      borderRadius: 'var(--radius-control)',
      opacity: disabled ? 0.4 : 1
    }
  }), helper && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      lineHeight: 1.45,
      color: 'var(--text-secondary)'
    }
  }, helper));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Input = __ds_scope.Input;

})();
