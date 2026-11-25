import {Layout} from './components/Layout';
import {Home} from './views/Home';
import {DynamicPage} from './views/DynamicPage';
import {PrivacyContent} from './PrivacyContent';
export function SiteApp({slug,type='home'}:{slug?:string;type?:'home'|'article'|'privacy'}){return <Layout>{type==='article'&&slug?<DynamicPage slug={slug}/>:type==='privacy'?<PrivacyContent/>:<Home/>}</Layout>}
