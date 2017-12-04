<template>
  <panel>
    <div slot="title">Frequently Asked Questions</div>
    <div class="content markdown-body">
      <ul>
        <li>Where is the input and the output?
          <p>Your program shall read input from <code>stdin</code>('Standard Input') and write output to <code>stdout</code>('Standard Output').
            For example,you can use <code>scanf</code> in C or <code>cin</code> in C++ to read from stdin,and use <code>printf</code> in C or <code>cout</code> in C++ to write to stdout.
            User programs are not allowed to read or write files, or you will get a <code>Runtime Error</code>.
          </p>
        </li>
        <li>What's the meaning of the submission execution time?
        <p>The onlinejudge might test your code multiple times with different input files.
          If your code gives the correct answer within the time limit for each input file, the execution time displayed is the max of the time spent for each test case.
          Otherwise, the execution time will have no sense.
        </p>
        </li>
        <li>How can I use C++ Int64?
          <p>You should declare as <code>long long</code> and use with <code>cin/cout</code> or <code>%lld</code>, using<code> __int64</code> will result in <code>Compile Error</code>.</p>
        </li>
        <li>Java specifications?
          <p>All programs must begin in a static main method in a <code>Main</code> class. Do not use public classes: even <code>Main</code> must be non public to avoid compile error.Use buffered I/O to avoid time limit exceeded due to excesive flushing.</p>
        </li>
        <li>About presentation error?
          <p>There is no presentation error in this oj.The judger will trim the blacks and wraps in your ouput's <b>last</b> line.
            if it's still different with the correct output, the result will be <code>Wrong Answer</code>.</p>
        </li>
        <li>How to report bugs about this oj?
          <p>The onlinejudge is open source, you can open an issue in <a href="https://github.com/QingdaoU/OnlineJudge">Github</a>.
            The details(like env, version..) about a bug is required, which will help us a lot to solve the bug.
            Certainly, we are very pleased to merge your pull requests.
          </p>
        </li>
      </ul>
    </div>
  </panel>
</template>

<script>
</script>

<style lang="less" scoped>
  .content {
    font-size: 16px;
    margin: 0 50px 40px 50px;
    > ul {
      list-style: disc;
      li {
        font-size: 16px;
        margin-top: 20px;
        &:first-child {
          margin-top: 0;
        }
        p {
          font-size: 14px;
          margin-top: 5px;
        }
      }
    }
  }
</style>
