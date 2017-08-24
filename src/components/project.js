import React, { Component } from 'react';
import { List, is } from 'immutable';

import '../common.scss'

class Project extends Component {
    constructor(props) {
        super(props);
        let file = this.props.project.get('files').findEntry(v => v.get('type') === 'file');
        this.state = {
            folders: {}, // collapsed,
            collapseProjectSelector: true,
            selectedFilePath: List().push(file[0]),
        };
        this.initState(this.state.folders, this.props.project.get('files'), true);
    }

    initState(state, files, root, folderName) {
        for (let [k, v] of files) {
            if (v.get('type') === 'directory') {
                this.initState(state, v.get('data'), false, k);
            }
        }
        if (!root) {
            state[folderName] = true;
            state.another = 1234;
        }
    }

    toggleFolderCollapsed = (folderName) => {
        this.setState((prev) => {
            return {
                folders: Object.assign(prev.folders, {
                    [folderName]: !prev.folders[folderName],
                }),
            }
        });
    }

    toggleProjectSelectorCollapsed = () => {
        this.setState((prev) => {
            return {
                collapseProjectSelector: !prev.collapseProjectSelector,
            }
        })
    }

    fileClicked = (path) => {
        this.setState(()=> {
            return {
                selectedFilePath: path,
            }
        })
        this.props.setEditorPath(path);
    }

    renderProjects(allProjects) {
        let items = [];
        for (let [k, v] of allProjects) {
            items.push(<div key={k} className="project-item" onClick={this.props.selectProject.bind(this, k)}>{v.get('displayName')}</div>);
        }
        return items;
    }

    renderFile(key, value, path) {
        console.log(path);
        return <div key={key} onClick={this.fileClicked.bind(this, path)} className={`project-file ${(is(this.state.selectedFilePath,path)) ? 'project-file-selected' : ''}`}>{key}</div>;
    }

    renderItems(files, root, folderName, path = List()) {
        let items = [];
        for (let [k, v] of files) {
            if (v.get('type') === 'file') {
                items.push(this.renderFile(k, v, path.push(k)));
            } else if (v.get('type') === 'directory') {
                items.push(this.renderItems(v.get('data'), false, k, path.push(k, 'data')));
            }
        }
        if (root) {
            return items;
        } else {
            return <div key="project-folder-container" className="project-folder-container">
                <div onClick={this.toggleFolderCollapsed.bind(this, folderName)} className={`project-folder ${this.state.folders[folderName] ? "hide-items" : "show-items"}`}><span>{this.state.folders[folderName] ? "▷" : "◢"}</span>{folderName}</div>
                {items}
            </div>;
        }
    }

    render() {
        return (
            <div className="project-container">
                <div className={`current-project ${this.state.collapseProjectSelector ? "hide-items" : "show-items"}`} onClick={this.toggleProjectSelectorCollapsed}>
                    {this.props.project.get('displayName')}
                    <div className="project-items-container" >
                        {this.renderProjects(this.props.allProjects)}
                    </div>
                </div>

                <div className="project-explorer">
                    {this.renderItems(this.props.project.get('files'), true)}
                </div>
            </div>
        );
    }
}

export default Project;