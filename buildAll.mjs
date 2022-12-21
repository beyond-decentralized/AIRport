import { spawn } from 'child_process';

const firstStageProjectDirectoriesInBuildOrder = [
    'libs/direction-indicator',
    'apis/aviation-communication',
    'apis/ground-control',
    'apis/check-in',
    'apis/apron',
    'ORMs/tarmaq/entity',
    'ORMs/tarmaq/query',
    'ORMs/tarmaq/dao',
    'apis/air-traffic-control',
    'libs/pressurization',
    'libs/vhf-radio',
    'libs/autopilot',
    'libs/flight-number',
    'generators/taxiway'
]

const airbridgeDependencyProjectDirectories = [
    'validate'
]

const secondStageProjectDescriptors = [
    'schemas/airport-code',
    // {
    //     directory: 'schemas/airport-code',
    //     isApp: true
    // },
    'schemas/airspace',
    // {
    //     directory: 'schemas/airspace',
    //     isApp: true
    // },
    'schemas/travel-document-checkpoint',
    // {
    //     directory: 'schemas/travel-document-checkpoint',
    //     isApp: true
    // },
    'schemas/holding-pattern',
    // {
    //     directory: 'schemas/holding-pattern',
    //     isApp: true
    // },
    'schemas/final-approach',
    'schemas/layover',
    // {
    //     directory: 'schemas/layover',
    //     isApp: true
    // },
    'apis/arrivals-n-departures',
    'apis/terminal-map',
    'engines/tower',
    'libs/fuel-hydrant-system',
    'libs/session-state',
    // {
    //     directory: 'libs/session-state',
    //     isApp: true
    // },
    'libs/blueprint',
    'generators/takeoff',
    'generators/landing'
]

const airwayDependencyProjectDirectories = [
    'types',
    'client'
]

const thirdStageProjectDirectories = [
    'libs/ground-transport',
    'engines/terminal',
    'databases/sequence',
    'generators/runway',
    'databases/sqlite',
    'databases/sqljs',
    'platforms/api',
    'platforms/server',
    'platforms/web-tower',
    'platforms/web-terminal',
]

const reactUiProjects = [
    'components',
    'main'
]

try {
    await buildPeerFramework('AIRport', firstStageProjectDirectoriesInBuildOrder, true)
    await buildPeerFramework('AIRbridge', airbridgeDependencyProjectDirectories, true)
    await buildPeerFramework('AIRport', secondStageProjectDescriptors, false)
    await buildPeerFramework('AIRway', airwayDependencyProjectDirectories, true)
    await buildPeerFramework('AIRport', thirdStageProjectDirectories, false)
    await buildUI('react', reactUiProjects)
} catch (e) {
    console.log(e)
}

async function buildPeerFramework(
    frameworkDirectoryName,
    projectDescriptorsInBuildOrder,
    runRushUpdate
) {
    process.chdir('../' + frameworkDirectoryName);
    if (runRushUpdate) {
        await wireInDependencies(frameworkDirectoryName)
    }
    await buildProjects(projectDescriptorsInBuildOrder, 'npm', ['run', 'build']);
}

async function buildUI(
    uiType,
    uiProjects
) {
    process.chdir('UI/' + uiType);
    await buildProjects(uiProjects, 'npm', ['run', 'build']);
    process.chdir('../..');
}

async function buildProjects(
    projectsDescriptorsInBuildOrder,
    command,
    parameters
) {
    for (const projectDescriptor of projectsDescriptorsInBuildOrder) {
        // let isApp = false;
        let projectDirectory
        // if (projectDescriptor instanceof Object) {
        //     projectDirectory = projectDescriptor.directory
        //     isApp = projectDescriptor.isApp
        // } else 
        if (typeof projectDescriptor === 'string') {
            projectDirectory = projectDescriptor
        } else {
            throw `Expecting either object or string as a Project Descriptor.`
        }
        const directoryDepth = projectDirectory.split('/');
        let navigateBackPath = '..'
        for (let i = 1; i < directoryDepth.length; i++) {
            navigateBackPath = '../' + navigateBackPath
        }
        process.chdir('./' + projectDirectory);

        // if (isApp) {
        //     await execute('node', ['generate.mjs'], projectDirectory);
        // }

        await execute(command, parameters, projectDirectory);

        process.chdir(navigateBackPath);
    };
}

async function wireInDependencies(
    frameworkName
) {
    await execute('rush', ['update'], frameworkName)
}

async function execute(
    command,
    parameters,
    projectDirectory
) {
    return new Promise((resolve, _reject) => {
        if (/^win/.test(process.platform)) {
            parameters = [
                '/s',
                '/c',
                command,
                ...parameters
            ]
            command = 'cmd'
        }

        process.stdout.write(`
        RUNNING '${command} ${parameters.join(' ')}' in ${process.cwd()}
    
        `)

        const runCommand = spawn(command, parameters);

        runCommand.stdout.on("data", data => {
            console.log(`${data}`)
        });

        runCommand.stderr.on("data", data => {
            console.log(`${data}`)
        });

        runCommand.on('error', (error) => {
            console.log(`${error.message}`);
        });

        runCommand.on("close", code => {
            console.log(`
        ${code ? 'ERROR' : 'DONE'}: '${command} ${parameters.join(' ')}' in ${process.cwd()}

    `);
            resolve(code)
        });
    }).then((returnCode) => {
        if (returnCode != 0) {
            throw new Error(`
        Suspending after ${projectDirectory}
        `)
        }

        return returnCode
    })

}