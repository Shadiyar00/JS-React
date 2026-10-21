import { useEffect, useState } from 'react';
import { resourcesApi } from '../api/resources.js';
import FilterBar from './FilterBar.jsx';
import ResourceCard from './ResourceCard.jsx';
import Pagination from './Pagination.jsx';
import StatusPanel from './StatusPanel.jsx';
const defaults = { search:'',topic:'',level:'',format:'',sort:'title',page:1 };
export default function Catalog() {
  const [query,setQuery] = useState(defaults);
  const [result,setResult] = useState(null);
  const [status,setStatus] = useState('loading');
  const [error,setError] = useState('');
  const [retry,setRetry] = useState(0);
  const [fail,setFail] = useState(false);
  const [restoring,setRestoring] = useState(false);
  const [notice,setNotice] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');
    resourcesApi.list(query,{signal:controller.signal,fail}).then(data => {
      if (!controller.signal.aborted) { setResult(data); setStatus('success'); }
    }).catch(err => { if (!controller.signal.aborted) { setError(err.message); setStatus('error'); } });
    return () => controller.abort();
  },[query,retry,fail]);
  function change(key,value) { setQuery(previous => ({...previous,[key]:value,page:1})); }
  async function restore() {
    if (!window.confirm('Restore the 120 sample resources? Your added resources will be removed.')) return;
    setRestoring(true);
    try { await resourcesApi.restore(); setFail(false); setQuery(defaults); setRetry(value => value + 1); setNotice('Sample catalog restored.'); }
    catch(err) { setNotice(err.message); }
    finally { setRestoring(false); }
  }
  return <>
    <section className="hero"><div><div className="eyebrow">YOUR NEXT SKILL STARTS HERE</div><h1>A little curiosity.<br/><em>A lot of possibility.</em></h1><p>A thoughtful shelf of guides, courses, and practice tasks.<br/>Find your next step, and make it yours.</p><a className="button" href="#/add">＋ Add a resource</a></div><div className="hero-note"><div className="note-label">THE STUDY METHOD</div><span className="note-number">01 / 03</span><h2>Explore.<br/>Try it.<br/><span>Explain it.</span></h2><p>Small steps. Real understanding.</p><div className="note-line"/></div></section>
    <div className="catalog-heading"><div><span className="eyebrow">THE COLLECTION</span><h2>Make room for learning<span>.</span></h2></div><span className="collection-count">{result ? result.catalogTotal : '120'} resources · 8 topics</span></div>
    <FilterBar query={query} onChange={change} onReset={() => setQuery(defaults)}/>
    <div className="results-toolbar"><span role="status">{status === 'loading' ? 'Finding your resources…' : status === 'error' ? 'Catalog unavailable' : `${result.total} resources found`}</span><label>Sort by <select value={query.sort} onChange={event => change('sort',event.target.value)}><option value="title">Title A–Z</option><option value="duration">Shortest first</option><option value="newest">Newest first</option></select></label></div>
    {status === 'loading' && <StatusPanel title="Opening the shelf…" message="Your learning resources are on their way."/>}
    {status === 'error' && <StatusPanel error title="We hit a small bump" message={error} action={() => setRetry(value => value + 1)} actionLabel="Try again"/>}
    {status === 'success' && (result.total ? <><div className="resource-grid">{result.items.map(item => <ResourceCard key={item.id} item={item}/>)}</div><Pagination page={result.page} totalPages={result.totalPages} onChange={page => setQuery(previous => ({...previous,page}))}/></> : <StatusPanel title="A fresh shelf" message="No resources match these filters. Try a broader search." action={() => setQuery(defaults)} actionLabel="Clear filters"/>)}
    <details className="demo-tools"><summary>Demo & catalog tools</summary><p>Use these controls to demonstrate error handling during the defense.</p><label><input type="checkbox" checked={fail} onChange={event => setFail(event.target.checked)}/> Simulate API error</label><button disabled={restoring} onClick={restore}>{restoring ? 'Restoring…' : 'Restore sample catalog'}</button>{notice && <p role="status">{notice}</p>}</details>
  </>;
}
