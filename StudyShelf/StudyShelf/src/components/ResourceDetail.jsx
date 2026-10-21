import { useEffect, useState } from 'react';
import { resourcesApi } from '../api/resources.js';
import { TopicMark } from './ResourceCard.jsx';
import StatusPanel from './StatusPanel.jsx';
export default function ResourceDetail({ id }) {
  const [item,setItem] = useState(null);
  const [error,setError] = useState('');
  const [retry,setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setItem(null); setError('');
    resourcesApi.detail(id,{signal:controller.signal}).then(value => {if(!controller.signal.aborted) setItem(value);}).catch(err => {if(!controller.signal.aborted) setError(err.message);});
    return () => controller.abort();
  },[id,retry]);
  return <section className="detail-page"><a className="back-link" href="#/">← Back to collection</a>{error ? <StatusPanel error title="Resource unavailable" message={error} action={() => setRetry(value => value + 1)} actionLabel="Retry"/> : !item ? <StatusPanel title="Loading resource…" message="One moment, please."/> : <article className="detail-card"><TopicMark topic={item.topic}/><div className="eyebrow">{item.topic} / {item.format}</div><h1>{item.title}</h1><div className="detail-meta"><span>{item.level}</span><span>{item.minutes} minutes</span><span>Added {new Date(item.createdAt).toLocaleDateString('en-GB')}</span></div><p>{item.description}</p><h2>Your study checklist</h2><ol><li>Read the relevant section in the source documentation.</li><li>Build a small example and change one thing.</li><li>Explain what changed and why it works.</li></ol><a className="button" href={item.url} target="_blank" rel="noopener noreferrer">Open learning source ↗</a><small className="source-url">{item.url}</small></article>}</section>;
}
