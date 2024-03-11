function alignment(seq1, seq2, matchScore, mismatchScore, gapPenalty) {
    // Initialize the scoring matrix
    let scoreMatrix = [];
    for (let i = 0; i <= seq1.length; i++) {
        scoreMatrix[i] = [];
        for (let j = 0; j <= seq2.length; j++) {
            scoreMatrix[i][j] = 0;
        }
    }

    // Initialize the traceback matrix
    let tracebackMatrix = [];
    for (let i = 0; i <= seq1.length; i++) {
        tracebackMatrix[i] = [];
        for (let j = 0; j <= seq2.length; j++) {
            tracebackMatrix[i][j] = '';
        }
    }

    // Initialize the first row and column with gap penalties
    for (let i = 0; i <= seq1.length; i++) {
        scoreMatrix[i][0] = i * gapPenalty;
        tracebackMatrix[i][0] = 'up';
    }
    for (let j = 0; j <= seq2.length; j++) {
        scoreMatrix[0][j] = j * gapPenalty;
        tracebackMatrix[0][j] = 'left';
    }

    // Fill in the scoring and traceback matrices
    for (let i = 1; i <= seq1.length; i++) {
        for (let j = 1; j <= seq2.length; j++) {
            let match = scoreMatrix[i - 1][j - 1] + (seq1[i - 1] === seq2[j - 1] ? matchScore : mismatchScore);
            let gapSeq1 = scoreMatrix[i - 1][j] + gapPenalty;
            let gapSeq2 = scoreMatrix[i][j - 1] + gapPenalty;
            scoreMatrix[i][j] = Math.max(match, gapSeq1, gapSeq2);

            if (scoreMatrix[i][j] === match) {
                tracebackMatrix[i][j] = 'diagonal';
            } else if (scoreMatrix[i][j] === gapSeq1) {
                tracebackMatrix[i][j] = 'up';
            } else {
                tracebackMatrix[i][j] = 'left';
            }
        }
    }

    let align1 = '';
    let align2 = '';
    let i = seq1.length;
    let j = seq2.length;
    let totalGaps = 0
    let score = scoreMatrix[seq1.length][seq2.length]
    while (i > 0 || j > 0) {
        if (tracebackMatrix[i][j] === 'diagonal') {
            align1 = seq1[i - 1] + align1;
            align2 = seq2[j - 1] + align2;
            i--;
            j--;
        } else if (tracebackMatrix[i][j] === 'up') {
            align1 = seq1[i - 1] + align1;
            align2 = '-' + align2;
            i--;
            totalGaps++
        } else {
            align1 = '-' + align1;
            align2 = seq2[j - 1] + align2;
            j--;
            totalGaps++
        }
    }
    let matches = 0
    for(let i = 0; i < align1.length; i++){
        if(align1[i] === align2[i] && align1[i] != '-'){
            matches++
        }
    }

    return [align1, align2, matches, totalGaps, score];
}

function brokenLine(seq){
    let lines = []
    let limit = 0
    let lineAux = ''
    for(let i = 0; i < seq.length; i++){
        if(limit == 60){
            lines.push(lineAux)
            limit = 0
            lineAux = ''
        }
        lineAux += seq[i]
        limit++
    }
    lines.push(lineAux)
    return lines
}

function paint(seq1, seq2){

    let paintedSeq1 = ''
    let paintedSeq2 = ''

    for(let i = 0; i < seq1.length; i++){
        if(seq1[i] === seq2[i] && seq1[i] != '-'){
            paintedSeq1 += `<span class="green">${seq1[i]}</span>`
            paintedSeq2 += `<span class="green">${seq2[i]}</span>`
        }
        else if(seq1[i] != seq2[i] && seq1[i] != '-' && seq2[i] != '-'){
            paintedSeq1 += `<span class="yellow">${seq1[i]}</span>`
            paintedSeq2 += `<span class="yellow">${seq2[i]}</span>`
        }else{
            paintedSeq1 += `<span class="red">${seq1[i]}</span>`
            paintedSeq2 += `<span class="red">${seq2[i]}</span>`
        }
    }
    return [paintedSeq1, paintedSeq2]
}

function formatAlignment(seq1, seq2) {
    let lines1 = brokenLine(seq1)
    let lines2 = brokenLine(seq2)
    let formatedSeq = ''
    for(let i = 0; i < lines1.length; i++){
        let [paintedSeq1, paintedSeq2] = paint(lines1[i], lines2[i])
        formatedSeq += `${paintedSeq1}<br>${paintedSeq2}<br><br>`
    }

    return formatedSeq
}

module.exports = {
    alignment,
    formatAlignment
}