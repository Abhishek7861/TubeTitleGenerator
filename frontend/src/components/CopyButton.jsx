function CopyButton({ text, label = "Copy" }) {
    return (
        <button
            type="button"
            onClick={() => navigator.clipboard.writeText(text)}
        >
            {label}
        </button>
    );
}

export default CopyButton;
