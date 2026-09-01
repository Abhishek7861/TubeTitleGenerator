import CopyButton from "../../components/CopyButton";

function TitleResults({ result }) {
    return (
        <div className="results">

            <ResultBlock title="Best title">
                <div className="best-title">
                    <span>{result.bestTitle}</span>
                    <CopyButton text={result.bestTitle} />
                </div>
            </ResultBlock>

            <ResultBlock title="All titles">
                <ul className="title-list">
                    {result.titles?.map((t, i) => (
                        <li key={i}>
                            <span>{t}</span>
                            <CopyButton text={t} />
                        </li>
                    ))}
                </ul>
            </ResultBlock>

            <ResultBlock title="Description">
                <p className="description">{result.description}</p>
            </ResultBlock>

            <ResultBlock title="Tags">
                <ChipList items={result.tags} />
            </ResultBlock>

            <ResultBlock title="Hashtags">
                <ChipList items={result.hashtags} variant="hashtag" />
            </ResultBlock>

            {result.thumbnailText && (
                <ResultBlock title="Thumbnail text">
                    <p className="thumbnail-text">{result.thumbnailText}</p>
                </ResultBlock>
            )}

        </div>
    );
}

function ResultBlock({ title, children }) {
    return (
        <div className="result-block">
            <h3>{title}</h3>
            {children}
        </div>
    );
}

function ChipList({ items, variant }) {
    return (
        <div className="chips">
            {items?.map((item, i) => (
                <span
                    key={i}
                    className={"chip" + (variant ? " " + variant : "")}
                >
                    {item}
                </span>
            ))}
        </div>
    );
}

export default TitleResults;
