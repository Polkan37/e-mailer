import React from 'react'
import CodeEditor from '@uiw/react-textarea-code-editor';

import loading from '../../assets/Loading_icon.gif'

export function Preview({ index, language, subject, templateHTML, news, markUpOnly = false }) {
    const loadingImg = `<img src=${loading} alt='' width='200' />`
    return (
        <>
            <div className="container">
                {markUpOnly ? '' : (<div className="info">
                    <h4>{language}</h4>
                    <p className="template-header">
                        <b>Subject</b> - {subject}
                    </p>
                    {news ? (<p className="template-header"><b>News:</b>
                        {news.img ? <img src={news.img} alt='' width="100%" /> : ''}
                        {news.text}
                    </p>) : ''}

                    <label className="html-label">
                        html
                        <CodeEditor value={templateHTML} id="html" language="html"
                            padding={10}
                            style={{
                                fontSize: 12,
                                backgroundColor: "#fefefe",
                                border: "1px solid #e4e4e4",
                                maxHeight: '500px',
                                overflowY: 'scroll'
                            }} />
                    </label>
                </div>)}

                <div className="desktop">
                    <p>Desktop</p>
                    <iframe
                        id={`desktopFrame_${index}`}
                        title="Inline Frame Example"
                        width="650"
                        height="900"
                        sandbox="allow-same-origin allow-popups"
                        srcDoc={templateHTML?.length ? templateHTML : loadingImg}
                    />
                </div>
                <div className="mobile">
                    <p>Mobile</p>
                    <div className="mobile-container">
                        <div>
                            <iframe
                                id={`templateFrame_${index}`}
                                title="Inline Frame Example"
                                width="350"
                                height="710"
                                sandbox="allow-same-origin allow-popups"
                                srcDoc={templateHTML?.length ? templateHTML : loadingImg}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
