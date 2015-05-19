import { SearchUI } from './search_ui';
import { instagramstore } from './instagram_store';

SearchUI.initialize();
instagramstore.onChange(SearchUI.renderResults);
