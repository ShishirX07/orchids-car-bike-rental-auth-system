import { useRef } from 'react';

export default function OtpInput({ value, onChange, length = 6, error }) {
  const inputRefs = useRef([]);

  const handleChange = (idx, e) => {
    const val = e.target.value.replace(/\D/, '');
    if (!val) return;
    const arr = value.split('');
    arr[idx] = val.slice(-1);
    onChange(arr.join(''));
    if (idx < length - 1 && val) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace') {
      if (value[idx]) {
        const arr = value.split('');
        arr[idx] = '';
        onChange(arr.join(''));
      } else if (idx > 0) {
        inputRefs.current[idx - 1]?.focus();
        const arr = value.split('');
        arr[idx - 1] = '';
        onChange(arr.join(''));
      }
    }
    if (e.key === 'ArrowLeft' && idx > 0) inputRefs.current[idx - 1]?.focus();
    if (e.key === 'ArrowRight' && idx < length - 1) inputRefs.current[idx + 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange(pasted.padEnd(length, ' ').slice(0, length).trimEnd());
    const nextIdx = Math.min(pasted.length, length - 1);
    inputRefs.current[nextIdx]?.focus();
  };

  return (
    <div className="flex gap-2.5 justify-center">
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          ref={el => inputRefs.current[idx] = el}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[idx] || ''}
          onChange={e => handleChange(idx, e)}
          onKeyDown={e => handleKeyDown(idx, e)}
          onPaste={handlePaste}
          className={`otp-input ${
            error ? 'border-red-500 focus:ring-red-500/50' :
            value[idx] ? 'border-orange-500/50 bg-orange-500/5' : ''
          }`}
        />
      ))}
    </div>
  );
}
