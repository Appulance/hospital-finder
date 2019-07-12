function encodeQueryData(data) {
	// data = { 'output': 'json', 'key': 'asdf' }
	// return "?output=json&key=asdf";
	
	const ret = [];
	for (let d in data)
		ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
	return ret.join('&');
}

function encodedQueryData(data) {
	// data = { 'output': 'json', 'key': 'asdf' }
	// return "?output=json&key=asdf";
	
	const ret = [];
	for (let d in data)
		ret.push(d + '=' + data[d]);
	return ret.join('&');
}

function sortContainerBy(arg, sel, elem, order) {
	// sortMeBy("data-category", "ul.search-results", "li", "asc");
        var $selector = $(sel),
        $element = $selector.children(elem);
        $element.sort(function(a, b) {
                var an = parseInt(a.getAttribute(arg)),
                bn = parseInt(b.getAttribute(arg));
                if (order == "asc") {
                        if (an > bn)
                        return 1;
                        if (an < bn)
                        return -1;
                } else if (order == "desc") {
                        if (an < bn)
                        return 1;
                        if (an > bn)
                        return -1;
                }
                return 0;
        });
        $element.detach().appendTo($selector);
}

function render(props) {
  return function(tok, i) { return (i % 2) ? props[tok] : tok; };
}